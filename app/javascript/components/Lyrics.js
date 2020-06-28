import React from 'react';
import { Consumer } from '../context';
import Track from './Track';
import Spinner from './Spinner';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  font-family: 'Jost', sans-serif;
`
const Bigtext = styled.h1`
  display: block;
  font-family: 'DM Serif Display', serif;
  font-size: 32px;
  margin-block-start: 0.2em;
  margin-block-end: 0.2em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`
const Smalltext = styled.h4`
  display: block;
  font-family: 'Jost', sans-serif;
  font-size: 17.5px;
  margin-block-start: 0em;
  margin-block-end: 2em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`

class Lyrics extends React.Component {
  render () {
    return (
      <Consumer>
          {value => {
            const { track_list, heading } = value;
            if(track_list === undefined || track_list.length === 0) {
              return <Spinner/>
            } else {
              return (
                <div>
                  <Bigtext>{heading}</Bigtext>
                  <Smalltext>Check out lyrics from your favorite songs and expand your vocabulary</Smalltext>
                  <Container>
                    {track_list.map( (item, index) => (
                      <Track 
                      key={item.track.track_id}
                      track={item.track}
                      ranking={index + 1}
                      />
                    ))}
                  </Container>
                </div>
              );
            }
          }}
      </Consumer>
    );
  }
};

export default Lyrics;