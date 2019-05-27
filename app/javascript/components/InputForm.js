import React from 'react';
import Lyrics from './Lyrics'
import Search from './Search';
import styled, {css} from 'styled-components';
import lincoln from './img/lincoln.jpg';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 560px;
  background-image: url(${lincoln});
  background-position: center 69%; 
  background-size: cover;
  font-family: 'Source Sans Pro', sans-serif;

  ${props => props.lyrics && css`
    background-image: none;
  `};
`

const LyricsForm = styled.div`
  flex: 0 0 50%;
`
const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 50%;

ul {
  display: flex;
  justify-content: center;
  align-items: center;
}
ul > label {
  flex: 1 0 70px;
  max-width: 70px;
  font-family: 'Baloo', cursive;
}
ul > label + * {
  flex: 0 0 25%;
}
`

const Input = styled.input`
  position: relative; 
  margin: 0;
  width: 9em;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #white;
  padding: 10px;
  outline: none;
  transition: 0.3s all;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; 
  color: white;
  font-size: 20px;
  font-family: 'Source Sans Pro', sans-serif;

  ::placeholder{
    color: white;
  }

  &.focus{
    ::placeholder{
      color: transparent;
      transition: 0.3s all ease-in-out;
    }
  }


  ${props => props.push && css`
    border-radius: 5px;
    background: palevioletred;
    color: white;
    border: 2px solid palevioletred;
    font-family: 'Baloo', cursive;
    font-size: 22px;
  `};
`

const Label = styled.label`
  visibility:hidden;
  font-size: 14px;

  &.focus{
    visibility:visible;
    color: white;
    transition: 0.3s all ease-in-out;
  }
`

class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  };

  render () {
    const { active } = this.state;
    const FocusIs = `${(active === true) && 'focus' || ''}`;
    return (
          <React.Fragment>
            <Container lyrics>
              <Search/>
              <Lyrics/>
            </Container>
            <Container>
              <form onSubmit={(e)=>this.handleSubmit(e)} autoComplete="off">
              <StyledForm>
                <ul>
                  <Label className={FocusIs}>&nbsp;&nbsp;&nbsp;Name</Label>
                  <Input className={FocusIs}
                    name='name' 
                    placeholder='Name' 
                    value={this.props.input_name} 
                    onChange={this.props.onChange}
                    onFocus={() => this.setState({ active: true })}
                    onBlur={() => this.setState({ active: false })}
                  ></Input>
                </ul>
                <ul>
                  <Label className={FocusIs}>Japanese</Label>
                  <Input className={FocusIs}
                    name='japanese' 
                    placeholder='Japanese' 
                    value={this.props.input_japanese} 
                    onChange={this.props.onChange}
                    onFocus={() => this.setState({ active: true })}
                    onBlur={() => this.setState({ active: false })}
                  ></Input>
                </ul>
                <ul>
                <Label></Label>
                <Input push 
                  type='submit' 
                  value='+&nbsp;&nbsp;&nbsp;PLUS&nbsp;🥑'
                ></Input>
                </ul>
              </StyledForm>
              </form>
            </Container>
          </React.Fragment>
    );
  }
}

export default InputForm;

