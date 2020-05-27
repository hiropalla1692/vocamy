import React from 'react';
import Lyrics from './Lyrics';
import AddVoca from './AddVoca';
import LyricsContent from './LyricsContent';
import Search from './Search';
import styled, {css} from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


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

class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      track_name: "",
      artist_name: "",
      quote_lyrics: ""
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
      track_name: quote[0].track_name,
      artist_name: quote[0].artist_name,
      quote_lyrics: quote[1]
    })
  };


  render () {
    return (
          <React.Fragment>
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
                      quote_lyrics = {this.state.quote_lyrics}
                    />
                  </StyledForm>  
                </Router>
              </Container>
          </React.Fragment>
    );
  }
}

export default InputForm;

