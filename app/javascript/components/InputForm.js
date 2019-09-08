import React from 'react';
import Lyrics from './Lyrics';
import AddVoca from './AddVoca';
import LyricsContent from './LyricsContent';
import Search from './Search';
import styled, {css} from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import lincoln from './img/lincoln.jpg';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-image: none;
  background-size: cover;
  font-family: 'Source Sans Pro', sans-serif;
`

const StyledForm = styled.div`
  padding: 15px;
  display: flex;
  flex-basis: 40%;
  flex-direction: column;
  justify-content: center;
  ${props => props.lyrics && css`
  flex-basis: 60%;
  `};

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

  &:focus{
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
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.fillInWord = this.fillInWord.bind(this);
  }


  handleFormSubmit() {
    this.props.onFormSubmit();
  };

  fillInWord(e) {
    this.props.fillInWord(e);
    console.log(e);
  };


  render () {
    const { active } = this.state;
    const FocusIs = `${(active === true) && 'focus' || ''}`;
    return (
          <React.Fragment>
            <Search/>
            <Container>
              <Router>
                <StyledForm lyrics>  
                  <Switch>
                    <Route exact path="/" component={Lyrics} />
                    <Route exact path="/lyrics/track/:id" 
                      render={(props) => <LyricsContent {...props} fillInWord={this.fillInWord} />}
                    />
                  </Switch>
                </StyledForm>  
                <StyledForm>  
                  <AddVoca
                    onFormSubmit = {this.handleFormSubmit}
                    onChange = {this.props.onChange}
                  />
                </StyledForm>  
              </Router>
            </Container>
          </React.Fragment>
    );
  }
}

export default InputForm;

