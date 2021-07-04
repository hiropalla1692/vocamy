import React, { Component } from 'react'
import axios from 'axios';
import styled, {css} from 'styled-components';
import { Consumer } from '../context';

const Button = styled.button`
  display: inline-block;
  border-radius: 1px;
  padding: 0.5rem 0;
  margin: 0.5rem 0.5rem;
  width: 6rem;
  font-family: 'Jost', sans-serif;
  background: black;
  color: white;
  border: 1px solid black;
  font-size: 15px;
  &:hover{
    transition: 0.2s all ease-in-out;
    background-color: #ebd3c0;
    color: black;
  }
  &:focus{
    outline: 0;
  }
`

const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 1px;
  font-family: 'Jost', sans-serif;
  padding: 0.5rem 0.25rem;
  margin: 0.5rem 0;
  width: 18rem;
  color: black;
  font-size: 15px;
  border: 0px;
  ::placeholder{
  color: black;
  }

  &:focus{
    outline: 0;
    border: 1px solid #ebd3c0;
    ::placeholder{
      color: gray;
    }
  }
`

const Container = styled.div`
  display: inline-flex;
  color: black;
  border-radius: 1px; 
  border-color: black;
  padding: 0rem 15px;
`

class Search extends Component {
  state = {
    trackTitle: ''
  };

  findTrack = (dispatch,e) => {
    e.preventDefault();

    axios.get(`https://cors.bridged.cc/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=cd969a404a655f1f226f121214a1dbad`)
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
            <Container>
              <form onSubmit={this.findTrack.bind(this,dispatch)} autoComplete="off">
                  <Input
                    placeholder="Search songs & more"
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange.bind(this)}
                  ></Input>
                <Button type="submit">Get Lyrics</Button>
              </form>
            </Container>
          )
        }}

      </Consumer>
    )
  }
}

export default Search;
