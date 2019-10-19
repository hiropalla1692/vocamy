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
  align-items: flex-start;
  background-image: none;
  background-size: cover;
  font-family: 'Source Sans Pro', sans-serif;
`

const StyledForm = styled.div`
  padding: 15px;
  display: flex;
  flex-basis: 70%;
  flex-direction: column;
  justify-content: center;
  
  ${props => props.addvoca && css`
  flex-basis: 30%;
  position: -webkit-sticky;
  position: sticky;
  top: 50px;
  `};
`
const Accshow = styled.div`
  height: 0;
  padding: 0;
  opacity: 0;
  transition: 0.2s;
`

const Input = styled.input`
  display: none;
  &:checked + ${Accshow} {
    height: auto;
    padding: 5px;
    opacity: 1;
  }
`

const Label = styled.label`
  display: block;
  width: 180px;
  margin: 1.5px 0;
  padding : 11px 12px;
  font-family: 'Source Sans Pro', sans-serif;
  border: 3px solid #0ecb27;
  color : #0ecb27;
  background : transparent;
  cursor :pointer;
  transition: all 0.4s;
  &:hover {
    background : #0ecb27;
    color : white;
}
`

class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      track_name: "",
      artist_name: ""
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.fillInWord = this.fillInWord.bind(this);
    this.quoteInfoGet = this.quoteInfoGet.bind(this);
  }

  handleFormSubmit() {
    this.props.onFormSubmit();
  };

  fillInWord(e) {
    this.props.fillInWord(e);
  };

  quoteInfoGet = (quote) => {
    this.props.quoteInfoGet(quote);
    this.setState({
      track_name: quote.track_name,
      artist_name: quote.artist_name
    })
  };


  render () {
    const { active } = this.state;
    const FocusIs = `${(active === true) && 'focus' || ''}`;
    return (
          <React.Fragment>
            <Label for='label1'>+ Cool Music, Cool Lyrics</Label>
            <Input type='checkbox' id='label1'></Input>
            <Accshow>
              <Search/>
              <Container>
                <Router>
                  <StyledForm>  
                    <Switch>
                      <Route exact path="/" component={Lyrics} />
                      <Route exact path="/lyrics/track/:id" 
                        render={(props) => <LyricsContent {...props} fillInWord={this.fillInWord} getQuoteInfo={this.quoteInfoGet}/>}
                      />
                    </Switch>
                  </StyledForm>  
                  <StyledForm addvoca>  
                    <AddVoca
                      onFormSubmit = {this.handleFormSubmit}
                      onChange = {this.props.onChange}
                      track_name = {this.state.track_name}
                      artist_name = {this.state.artist_name}
                    />
                  </StyledForm>  
                </Router>
              </Container>
            </Accshow>
          </React.Fragment>
    );
  }
}

export default InputForm;

