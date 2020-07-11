import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 


const StyledForm = styled.div`
  margin: 12px;
  padding: 1px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-family: 'Jost', sans-serif;
`

const Name = styled.span`
  text-align: left;
  font-size: 16px;
  font-family: 'Jost', sans-serif;
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
  font-family: 'Jost', sans-serif;
  a {
      color: black;
      text-decoration: none;
    }
`

const Accshow = styled.div`
  display: flex;
  align-items: center;
  height: 0;
  padding: 0;
  margin: 0;
  opacity: 0;
  transition: 0.2s;
  font-family: 'Jost', sans-serif;
  font-style: italic;
  font-size: 14px;
  color: black;
  span {
    margin-right: 0.5em;
    padding: 1% 1%;
    text-align: center;
    border-radius: 3px;
    background-color: #f8f4e6;
    box-shadow: 4px 4px #c1b1cf;
  }
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
  font-family: 'Jost', sans-serif;
  background : transparent;
  cursor :pointer;
  transition: all 0.3s;
  &:hover {
    color: #c1b1cf;
}
`
const Button = styled.button`
  display: inline-block;
  border-radius: 15px;
  padding: 0.2rem 0.5rem;
  margin: 0 0.5rem;
  font-family: 'Jost', sans-serif;
  font-size: 15px;
  background: black;
  color: white;
  border: 1px solid black;
  &:hover{
    transition: 0.2s all ease-in-out;
    background-color: #ebd3c0;
    color: black;
  }
  &:focus{
    outline: 0;
  }
  a {
    text-decoration: none;
    color: white;
    :hover {
      color: black;
    }
  }
`


const EachVoca = (props) => {
  
  const handleDelete = (id) => {
    console.log(id)
    props.onDelete(id);
  }

  const toggleToAdd = () => {
    props.toggleToAdd();
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
            <span>&nbsp;&nbsp;♬&nbsp;&nbsp;{props.q_lyric}&nbsp;&nbsp;</span><br></br>
            <Button onClick={()=>{handleDelete(props.id)}}>Delete</Button>
              <Button onClick={()=>{toggleToAdd()}} ><a href={`https://stark-inlet-32487.herokuapp.com/lyrics/track/${props.q_track_id}`}>View Full Lyrics of The Song</a></Button>
          </Accshow>
        </StyledForm>
      </React.Fragment>
  );
}};

export default EachVoca;