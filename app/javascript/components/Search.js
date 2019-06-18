import React, { Component } from 'react'
import axios from 'axios';
import { Consumer } from '../context';

class Search extends Component {
  state = {
    trackTitle: ''
  };

  findTrack = (dispatch,e) => {
    e.preventDefault();

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=5&page=1&s_track_rating=desc&apikey=cd969a404a655f1f226f121214a1dbad`)
      .then(res => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });
      })
      .catch(err => console.log(err));
    this.setState({ trackTitle: '' })
  }


  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <h1>Search For A Song</h1>
              <p>Add New Voca from any lyrics</p>
              <form onSubmit={this.findTrack.bind(this,dispatch)} autoComplete="off">
                <div>
                  <input 
                    placeholder="Song Title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange.bind(this)}
                  />
                </div>
                <button
                  type="submit"
                >
                  Get Track Lyrics
                </button>
              </form>
            </div>
          )
        }}

      </Consumer>
    )
  }
}

export default Search;
