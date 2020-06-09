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

const Quote　= styled.span`
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
  font-family: 'Karla', sans-serif;
  font-style: italic;
  font-size: 14px;
  color: gray;

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
const Button = styled.button`
  display: inline-block;
  border-radius: 1px;
  padding: 0.5rem 0.5rem;
  margin: 1rem 1rem;
  background: transparent;
  color: #0ecb27;
  border: 1px solid #0ecb27;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 15px;
  &:hover{
    transition: 0.2s all ease-in-out;
    background: #0ecb27;
    color: white;
  }
  &:focus{
    outline: 0;
  }
`



const EachVoca = (props) => {
  
  const handleDelete = (id) => {
    console.log(id)
    props.onDelete(id);
  }

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
            <span>👉&nbsp;{props.q_lyric}</span>&nbsp;&nbsp;<br></br>
            <Button onClick={()=>{handleDelete(props.id)}}>delete</Button>
          </Accshow>
        </StyledForm>
      </React.Fragment>
  );
}};

export default EachVoca;