import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { Consumer } from '../context';

const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  width: 6rem;
  background: black;
  color: white;
  border: 2px solid white;
`

class Search extends Component {
  state = {
    trackTitle: ''
  };

  findTrack = (dispatch,e) => {
    e.preventDefault();

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=6&page=1&s_track_rating=desc&apikey=cd969a404a655f1f226f121214a1dbad`)
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
              <h1>Search For A Track🏊‍♂️</h1>
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
                <Button type="submit">Get Track Lyrics</Button>
              </form>
            </div>
          )
        }}

      </Consumer>
    )
  }
}

export default Search;
