import React from 'react';
import { Link } from 'react-router-dom'; 
import styled from 'styled-components';

const TrackInformation = styled.div`
  font-family: 'Baloo', cursive;
  background-color: pink;
  width: 400px;
`

const Track = (props) => {
  const { track } = props;

  return (
    <div>
      <div>
        <TrackInformation>
          <h3>{track.track_name}</h3>
          <p>
            <strong>Artist</strong>: {track.artist_name}
            <br/>
            <strong>Album</strong>: {track.album_name}
          </p>
          <Link to={`lyrics/track/${track.track_id}`}>
            View Lyrics
          </Link>
        </TrackInformation>
      </div>
    </div>
  )
}

export default Track;
