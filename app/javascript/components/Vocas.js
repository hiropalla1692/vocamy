import React from 'react'
import styled, {css} from 'styled-components';
import InputForm from './InputForm'
import AlphabetBox from './AlphabetBox'
import EachVoca from './EachVoca'
import { Provider } from '../context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {HashLink} from 'react-router-hash-link';
import update from 'immutability-helper';

const Container = styled.div`
  margin-bottom: 15%;
  display: flex;
  flex-flow: column wrap;
`
const VocaList = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const ToggleBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  text-align: center;
  margin: 5% 5% 5% 5% !important;
  font-family: 'Source Sans Pro', sans-serif;
  p {
    position: relative;
    top: 25%;
    text-align: center;
    margin: 20px 20px 20px 20px;
  }
`
const Button = styled.button`
  border-radius: 50%;
  background: transparent;
  color: pink;
  text-align: center;
  font-size: 24px;
  height: 120px;
  width: 120px;
  border: 2px solid pink;
  outline: none;
  &:hover {
    background: silver;
  }

  ${props => props.set && css`
    background: pink;
    color: white;
    &:hover {
    background: pink;
    }
  `}
`;

const VocaSearch = styled.div`
  writing-mode: tb-rl;
  color: #0ecb27;
  font-family: 'Baloo', cursive;
  text-align: center;
  border-radius: 12px;
  border: 2px solid #0ecb27;
  height: 450px;
  margin: 30px 45px;
  position: -webkit-sticky;
  position: sticky;
  top: 50px;
  a {
      color: #0ecb27;
      text-decoration: none;
      &:hover {
        color: pink;
      }
    }
`

class Vocas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: 'true',
      vocas: this.props.vocas,
      user: this.props.user,
      text: null,
      input_name: '',
      input_japanese: '',
      input_q_artist: '',
      input_q_track: '',
      input_q_lyric: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewVoca = this.addNewVoca.bind(this);
    this.deleteVoca = this.deleteVoca.bind(this);
    this.fillInWord = this.fillInWord.bind(this);
    this.quoteInfoGet= this.quoteInfoGet.bind(this);
    this.setIsAddTrue= this.setIsAddTrue.bind(this);
    this.setIsAddFalse= this.setIsAddFalse.bind(this);
    this.onSubmitDelete = this.onSubmitDelete.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  
  handleFormSubmit() {
    var voca = {
      name: this.state.input_name,
      japanese: this.state.input_japanese,
      q_artist: this.state.input_q_artist,
      q_track: this.state.input_q_track,
      q_lyric: this.state.input_q_lyric,
      user_id: this.state.user.id,
    }
    $.post('/vocas',{voca: voca})
      .done((data) => {
        this.addNewVoca(data);
      });
  }

  addNewVoca(voca) {
    var vocas = update(this.state.vocas, {$push: [voca]})
    this.setState({
      vocas: vocas.sort((a,b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
    });
  }

  deleteVoca(voca) {
    var vocaArray = this.state.vocas.sort((a,b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    var vocaId = vocaArray.map((e) => e.id);
    var vocaIndex = vocaId.indexOf(voca.id); 
    var vocas = update(vocaArray, {$splice: [[vocaIndex, 1]]})
    this.setState({
      vocas: vocas.sort((a,b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
    });
  }

  onSubmitDelete (id) {
    var vocas = this.state.vocas;
    var voca;
    for (var i = 0;  i < vocas.length; i++) {
      if ( vocas[i].id == id ) {
        voca = vocas[i];
        break;
      }
    }
    $.ajax({
      method: "DELETE",
      url: `/vocas/${id}`,
      voca: voca
    })
      .done((data) => {
        this.deleteVoca(data);
      })
  }


  fillInWord (e) {
    console.log(e);
    this.setState({
      input_name: e
    });
  }

  quoteInfoGet = (quote) => {
    this.setState({
      input_q_track: quote[0].track_name,
      input_q_artist: quote[0].artist_name,
      input_q_lyric: quote[1]
    })
  };

  setIsAddTrue = () => {
    this.setState(() => ({
      isAdd: 'true'
    }))
  };

  setIsAddFalse = () => {
    this.setState(() => ({
      isAdd: 'false'
    }))
  };

  render() {
    var alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    return (
      <Provider>
        <Container>
          {this.state.isAdd === 'true'
          ? (
            <div>
              <ToggleBar>
                  <Button set onClick={this.setIsAddTrue}>Add🥑</Button>
                  <div><p>Check out your VOCAS →</p></div>
                  <Button onClick={this.setIsAddFalse}>Look🥑</Button>
              </ToggleBar>
              <InputForm
                input_name = {this.state.input_name}
                input_japanese = {this.state.input_japanese}
                onChange = {this.handleChange}
                fillInWord = {this.fillInWord}
                onFormSubmit = {this.handleFormSubmit}
                quoteInfoGet = {this.quoteInfoGet}
              />
            </div>
            ) 
          : (
            <div>
              <ToggleBar>
                <Button onClick={this.setIsAddTrue} >Add🥑</Button>
                <div><p>← Let's add new VOCA</p></div>
                <Button set onClick={this.setIsAddFalse} >Look🥑</Button>
              </ToggleBar>
              <VocaList>
                <Router>
                <VocaSearch>
                  {alphabets.map((i) => {
                    return (
                      <HashLink smooth to={`#${i}`}>
                        {i.toUpperCase()}&nbsp;&nbsp;
                      </HashLink>
                    );
                  })};
                </VocaSearch>
                <div>
                  {alphabets.map((i) => {
                    return (
                      <div>
                        <AlphabetBox
                          alp = {i.toUpperCase()}
                        />
                        {this.state.vocas.map ((voca) => {
                          if (voca.name[0].toLowerCase() === i) {
                            return (
                              <EachVoca
                                id = {voca.id}
                                name = {voca.name}
                                japanese = {voca.japanese}
                                q_artist = {voca.q_artist}
                                q_track = {voca.q_track}
                                q_lyric = {voca.q_lyric}
                                onDelete = {this.onSubmitDelete}
                              />
                            );
                          }
                        })}
                      </div>
                  );})}
                </div>
                </Router>
              </VocaList>
            </div>
            )
          }
        </Container>
      </Provider>
    );}
  }

export default Vocas;