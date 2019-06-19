import React from 'react';
import { Consumer } from '../context';
import Track from './Track';
import Spinner from './Spinner';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 280px;
  font-family: 'Source Sans Pro', sans-serif;
`
const TrackBox = styled.div`
  display: flex;
  flex-flow: row wrap;
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
                  <TrackBox>
                    {track_list.map(item => (
                      <Track 
                        key={item.track.track_id}
                        track={item.track}
                      />
                    ))}
                  </TrackBox>
                </div>
              );
            }
          }}
      </Consumer>
    );
  }
};

export default Lyrics;