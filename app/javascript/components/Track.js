import React from 'react';
import { Link } from 'react-router-dom'; 
import styled from 'styled-components';

const TrackBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const Button = styled.a`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  width: 8rem;
  background: transparent;
  color: white;
  border: 2px solid white;
`
const TrackInformation = styled.div`
  border-radius: 4px;
  padding: 0.5rem 2rem;
  margin: 1rem 1rem;
  color: white
  font-family: 'Source Sans Pro', sans-serif;
  background-color: #9ca5eb;
  box-shadow: 5px 5px 5px #999;
  width: 150px;
`


const Track = (props) => {
  const { track } = props;

  return (
    <TrackInformation>
      <h3>{track.track_name}</h3>
      <p>
        <strong>Artist</strong>: {track.artist_name}
        <br/>
        <strong>Album</strong>: {track.album_name}
      </p>
      <Link to={`lyrics/track/${track.track_id}`}>
        <Button>&nbsp;&nbsp;>>View Lyrics 👑</Button>
      </Link>
    </TrackInformation>
  )
}

export default Track;
