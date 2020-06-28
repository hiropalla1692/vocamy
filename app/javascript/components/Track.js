import React from 'react';
import { Link } from 'react-router-dom'; 
import styled, {css} from 'styled-components';

const Button = styled.p`
  display: inline-block;
  border-radius: 1px;
  padding: 0 0;
  width: 8rem;
  background: #f8f4e6;
  color: black;
  text-align: center;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  &:hover{
    transition: 0.1s all ease-in-out;
    color: #c1b1cf;
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
  background-color: #f8f4e6;
  padding: 0rem 1rem;
  margin: 0.3rem 0.25rem;
  text-align: center;
  word-break: break-all;
  font-family: 'Jost', sans-serif;
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
          <Button>▷ View Lyrics </Button>
        </Link>
      </InformationBox>
    </TrackInformation>
  )
}

export default Track;
