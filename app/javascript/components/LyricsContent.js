import React, { Component } from 'react'
import Spinner from './Spinner';
import axios from 'axios';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.h1`
  border-radius: 2px;
  padding: 1rem 1rem;
  background-color: #f8f4e6;
  font-family: 'DM Serif Display', serif;
`
const Lyric = styled.h4`
  margin: 2% 4%;
`

const SingleWord = styled.span`
  text-decoration: none;
  font-family: 'Jost', sans-serif;
  color: black;
    :hover {
      color: #c1b1cf;
    }
`

class LyricsContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      lyrics: {}
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    this.props.fillInWord(e.target.title);
    document.getElementById( "name" ).value = e.target.title.toLowerCase();

    let q_line = this.state.lyrics.lyrics_body.split(/\r?\n/);
    let q_line_arr = [];

    q_line.map((value) => {
      q_line_arr.push(value)
    });

    for (var value of q_line_arr) {
      if (value.includes(e.target.title)) {
        let q_lyrics = value
        let quote = [this.state.track, q_lyrics];
        this.props.getQuoteInfo(quote);
        break;
      }
    }
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=cd969a404a655f1f226f121214a1dbad`)
      .then(res => {
        //console.log(res.data)
        this.setState({ lyrics: res.data.message.body.lyrics });
        return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=cd969a404a655f1f226f121214a1dbad`);
      })
      .then(res => {
        //console.log(res.data)
        this.setState({ track: res.data.message.body.track });
      })
      .catch(err => console.log(err));
  }
  
  render() {
    const { track, lyrics } = this.state;
    if(
      track === undefined || 
      lyrics === undefined || 
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner/>
    } else {
        var lyricsSentense = lyrics.lyrics_body.split(/\r?\n/)
        var lyricsBox = [];
        lyricsSentense.map((value) => {
          var tmp_array = value.split(' ');
          lyricsBox.push(tmp_array)
        })
      return (
        <React.Fragment>
          <Link to="/">Go Back</Link>
          <div>
            <Title>
              {track.track_name} <br></br><small>by <span>{track.artist_name}</span></small> 
            </Title>
            <Lyric>
              {lyricsBox.map((value) => {
                 var word = value.map( (each) => {
                   if (each === value[(value.length)-1]) {
                    return <SingleWord title={each} onClick={this.handleClick}>{each}<br></br></SingleWord>
                   } else {
                    return <SingleWord title={each} onClick={this.handleClick}>{each}&nbsp;</SingleWord>
                   }
                 })
                 return word
              })}
            </Lyric>
            {console.log(lyricsBox)}
          </div>
        </React.Fragment>
      )

    }
  }
}

export default LyricsContent;