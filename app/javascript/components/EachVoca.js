import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.div`
  margin: 12px;
  padding: 1px;
  display: flex;
  justify-content: left;
  align-items: center;
`

const Name = styled.span`
  text-align: left;
  font-size: 16px;
  font-family: 'Karla', sans-serif;
    a {
      color: black;
      text-decoration: none;
    }
`

const Japanese = styled.span`
  text-align: left;
  font-size: 15px;
  font-family: 'Kosugi Maru', sans-serif;
`

const Quote= styled.span`
  text-align: left;
  font-size: 11px;
  font-family: 'Karla', sans-serif;
  a {
      color: black;
      text-decoration: none;
    }
`

const Accshow = styled.div`
  height: 0;
  padding: 0;
  margin: 0;
  opacity: 0;
  transition: 0.2s;
  font-family: 'Source Sans Pro', sans-serif;
  font-style: italic;
  font-size: 16px;
  color: purple;

`

const Input = styled.input`
  display: none;
  &:checked + ${Accshow} {
    height: auto;
    padding: 2px;
    opacity: 1;
  }
`
const Label = styled.label`
  display: block;
  margin: 1px 0;
  padding : 2px 2px;
  font-family: 'Karla', sans-serif;
  background : transparent;
  cursor :pointer;
  transition: all 0.3s;
  &:hover {
    color : #0ecb27;
}
`


const EachVoca = (props) => {
  if (props.q_artist === null) {
    return (
      <StyledForm>
        <Name><a href="#">{props.name}&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</a></Name>
        <Japanese>{props.japanese}&nbsp;&nbsp;&nbsp;</Japanese>
      </StyledForm>
    );
  } else {
    return (
      <React.Fragment>
        <StyledForm>
          <Label for={props.name}>
            {props.name}&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
          </Label>
          <Japanese>{props.japanese}&nbsp;&nbsp;&nbsp;</Japanese>
          <Quote>quoted from <strong>{props.q_track}</strong>&nbsp;by&nbsp;<strong>{props.q_artist}</strong></Quote>
        </StyledForm>
        <StyledForm>
          <Input type='checkbox' id={props.name}></Input>
          <Accshow>
            <span>👉&nbsp;{props.q_lyric}</span>
          </Accshow>
        </StyledForm>
      </React.Fragment>
  );
}};

export default EachVoca;