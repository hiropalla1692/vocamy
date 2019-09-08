import React from 'react';
import { Link } from 'react-router-dom'; 
import styled, {css} from 'styled-components';

const Button = styled.p`
  display: inline-block;
  border-radius: 1px;
  padding: 0 0;
  width: 8rem;
  background: transparent;
  color: #0ecb27;
  text-align: center;
  border: 1px solid #0ecb27;
  &:hover{
    transition: 0.2s all ease-in-out;
    background: #0ecb27;
    color: white;
  }
  &:focus{
    outline: 0;
  }
`
const TrackInformation = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 0 1 30%;
  border-radius: 1px;
  padding: 0rem 1.0rem;
  margin: 0.25rem 0.25rem;
  border: 2px solid;
  text-align: center;
  word-break: break-all;
  font-family: 'Source Sans Pro', sans-serif;
`

const InformationBox = styled.div`
  position: relative;
  height: 60px;
  align-items: center;
  text-align: left;

  ${props => props.trackname && css`
  flex-basis: 40%;
  `};

  ${props => props.artist_album && css`
  flex-basis: 40%;
  `};

  ${props => props.link && css`
  flex-basis: 20%;
  `};
`
const InformationText = styled.h3`
  margin: 0;
  line-height: 59px;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  width: 200px;
  text-overflow: ellipsis;
  vertical-align: middle;
`

const Track = (props) => {
  const { ranking, track } = props;
  return (
    <TrackInformation>
      <InformationBox trackname>
          <InformationText><strong>{ranking}&nbsp;&nbsp;{track.track_name}</strong></InformationText>
      </InformationBox>
      <InformationBox artist_album>
        <InformationText artist>|&nbsp;&nbsp;{track.artist_name}</InformationText>
      </InformationBox>
      <InformationBox link>
        <Link to={`lyrics/track/${track.track_id}`}>
          <Button>&nbsp;&nbsp;>>View Lyrics 👑</Button>
        </Link>
      </InformationBox>
    </TrackInformation>
  )
}

export default Track;
