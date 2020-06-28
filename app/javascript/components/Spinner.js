import React from 'react';
import styled, {css} from 'styled-components';
import spinner from './spinner.gif';

const Container = styled.div`
  text-align: center;
`

export default () => {
    return (
      <Container>
        <img
          src={spinner}
          alt="Loading..."
        />
      </Container>
    );
  };

