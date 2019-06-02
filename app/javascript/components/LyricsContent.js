import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        console.log(res.data)
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
      return <h1>...loading</h1>
    } else {
      return (
        <React.Fragment>
          <Link to="/">Go Back</Link>
          <div>
            <h4>
              {track.track_name} by <span>{track.artist_name}</span>
            </h4>
            <div>
              <p>{lyrics.lyrics_body}</p>
            </div>
          </div>
        </React.Fragment>
      )

    }
  }
}

export default LyricsContent;