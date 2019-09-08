import React from 'react';
import { Consumer } from '../context';
import Track from './Track';
import Spinner from './Spinner';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
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
                  <h1>{heading}</h1>
                  <h4 style={{ color: "#ff1464" }}>Check out lyrics</h4>
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