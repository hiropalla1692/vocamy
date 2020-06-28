import React from 'react';
import styled, { css } from 'styled-components'

const Alphabet = styled.button`
  background-color: #ead2cf;
  text-align: center;
  font-size: 32px;
  font-family: 'DM Serif Display', serif;
  border-radius: 15px;
  border: 2px solid black;
  box-shadow: 3px 3px black;
  margin: 20px 0px;
  padding: 0 0px;
  height: 54px;
  width: 54px;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`

const AlphabetBox = (props) => {
  return (
    <Alphabet id={`${props.alp.toLowerCase()}`}>{props.alp}</Alphabet>
  );
};

export default AlphabetBox;