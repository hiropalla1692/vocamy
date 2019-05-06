import React from 'react';
import styled from 'styled-components';

const Name = styled.span`
  text-align: left;
  font-size: 18px
  font-family: 'Baloo', cursive;
    a {
      color: black;
      text-decoration: none;
    }
`

const Japanese = styled.span`
  text-align: left;
  font-size: 12px;
  font-family: 'Kosugi Maru', sans-serif;
`

const EachVoca = (props) => {
  return (
    <div>
      <Name><a href="#">{props.name}</a></Name>
      <Japanese>{props.japanese}</Japanese>
    </div>
  );
};

export default EachVoca;