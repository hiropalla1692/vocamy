import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.div`
  margin: 18px;
  padding: 1px;
  display: flex;
  justify-content: left;
  align-items: center;
`

const Name = styled.span`
  text-align: left;
  font-size: 18px
  font-family: 'Source Sans Pro', sans-serif;
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
    <StyledForm>
      <Name><a href="#">{props.name}&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</a></Name>
      <Japanese>{props.japanese}</Japanese>
    </StyledForm>
  );
};

export default EachVoca;