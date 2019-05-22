import React from 'react';

const Track = (props) => {
  const { track } = props;

  return (
    <div>
      <div>
        <div>
          <h5>{track.artist_name}</h5>
          <p>
            <strong><i></i> Track</strong>: {track.track_name}
            <br/>
            <strong><i></i> Album</strong>: {track.album_name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Track;
