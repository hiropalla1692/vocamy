import React from 'react';
import styled, { css } from 'styled-components'

const Alphabet = styled.span`
  background-color: trnasparent;
  color: palevioletred;
  text-align: center;
  font-size: 32px;
  font-family: 'Baloo', cursive;
  border-radius: 5px;
  border: 4px solid palevioletred;
  margin: 0 14px;
  padding: 0 16px;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`

const AlphabetBox = (props) => {
  return (
    <Alphabet>{props.alp}</Alphabet>
  );
};

export default AlphabetBox;