import React from 'react';
import styled, { css } from 'styled-components'

const Alphabet = styled.button`
  background-color: transparent;
  color: #0ecb27;
  text-align: center;
  font-size: 32px;
  font-family: 'Baloo', cursive;
  border-radius: 1px;
  border: 3px solid #0ecb27;
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