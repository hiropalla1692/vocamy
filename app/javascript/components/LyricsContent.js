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
      lyrics: {},
      track_id_spotify: ""
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
        this.setState({ lyrics: res.data.message.body.lyrics });
        return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=cd969a404a655f1f226f121214a1dbad`);
      })
      .then(res => {
        this.setState({ track: res.data.message.body.track });

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `${gon.authorization}`);
        console.log(gon.authorization);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        return fetch("https://accounts.spotify.com/api/token", requestOptions);
      })
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(result => {
        var accessToken = result.access_token
        var myHeaders2 = new Headers();
        myHeaders2.append("Authorization", `Bearer ${accessToken}`);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders2,
          redirect: 'follow'
        };
        var trackName = this.state.track.track_name.replace( ' ', '%20' )
        var artistName = this.state.track.artist_name.replace( ' ', '%20' )
        return fetch(`https://api.spotify.com/v1/search?q=track:${trackName}%20artist:${artistName}&type=track`, requestOptions)
      })
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(result => {
        this.setState({ track_id_spotify: result.tracks.items[0].id });
      })
      .catch(error => console.log('error', error));
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
            <div>
              <iframe src={`https://open.spotify.com/embed/track/${this.state.track_id_spotify}`} width="400" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
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
          </div>
        </React.Fragment>
      )

    }
  }
}

export default LyricsContent;