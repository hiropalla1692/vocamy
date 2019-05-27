import React from 'react';
import { Consumer } from '../context';
import Track from './Track';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 280px;
  font-family: 'Source Sans Pro', sans-serif;
`

class Lyrics extends React.Component {
  render () {
    return (
      <Consumer>
          {value => {
            const { track_list, heading } = value;
            if(track_list === undefined || track_list.length === 0) {
              return <h1>...loading</h1>
            } else {
              return (
                <div>
                  <h2>{heading}</h2>
                  <div>
                    {track_list.map(item => (
                      <Track 
                        key={item.track.track_id}
                        track={item.track}
                      />
                    ))}
                  </div>
                </div>
              );
            }
          }}
      </Consumer>
    );
  }
};

export default Lyrics;