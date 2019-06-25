import React, { Component } from 'react'
import Spinner from './Spinner';
import axios from 'axios';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.h1`
  color: white;
  border-radius: 2px;
  padding: 1rem 1rem;
  background-color: black;
`

const SingleWord = styled.a`
  text-decoration: none;
  color: black;
    :hover {
      color: #9ca5eb;
    }
`


class LyricsContent extends Component {
  state = {
    track: {},
    lyrics: {}
  };


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
            <h4>
              {lyricsBox.map((value) => {
                 var word = value.map( (each) => {
                   if (each === value[(value.length)-1]) {
                    return <SingleWord href="">{each}<br></br></SingleWord>
                   } else {
                    return <SingleWord href="">{each}&nbsp;</SingleWord>
                   }
                 })
                 return word
              })}
            </h4>
            {console.log(lyricsBox)}
          </div>
        </React.Fragment>
      )

    }
  }
}

export default LyricsContent;