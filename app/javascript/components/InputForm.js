import React from 'react';
import styled, {css} from 'styled-components';
import lincoln from './img/lincoln.jpg';

const StyledForm = styled.div`
  display: flex;
  height: 320px;
  justify-content: center;
  align-items: center;
  background-image: url(${lincoln});
  background-position: center 69%; 
  background-size: cover;
  font-family: 'Source Sans Pro', sans-serif;
`

const Input = styled.input`
  margin: 0;
  padding: 2px;
  background: none;
  border: none;
  border-radius: 0;
  padding: 10px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; 
  color: white;
  height: 36px;
  font-size: 20px;
  font-family: 'Source Sans Pro', sans-serif;

    ::placeholder{
      color: white;
    }

  ${props => props.push && css`
    border-radius: 3px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 11rem;
    background: transparent;
    color: white;
    border: 2px solid white;
    font-size: 20px;
  `};
`


class InputForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  };

  render () {
    return (
      <StyledForm>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <Input 
            name='name' 
            placeholder='Voca name' 
            value={this.props.input_name} 
            onChange={this.props.onChange}
          ></Input>
          <Input 
            name='japanese' 
            placeholder='Voca japanese' 
            value={this.props.input_japanese} 
            onChange={this.props.onChange}
          ></Input>
          <Input push 
            type='submit' 
            value='+ 🥑'
          ></Input>
        </form>
      </StyledForm>
    );
  }
}

export default InputForm;

