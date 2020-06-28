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
  text-align: left;
  font-family: 'Jost', sans-serif;

  div {
    margin: 0% 2%;
  }

  label {
    width: 60px;
    height: 30px;
    background: #bcb0cd;
    position: relative;
    display: inline-block;
    border-radius: 46px;
    transition: 0.4s;
    box-sizing: border-box;
    &:after { // ○ のスタイル
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      left: 0;
      top: 0;
      z-index: 2;
      background: #f8f4e6;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      transition: 0.4s;
      cursor: pointer;
    }
  }

  input {
    display: none;
    :checked {
      +label{
        background-color: #e3d1cf;
        &:after{
          left: 30px;
        }
      }
    }
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
  color: black;
  font-family: 'DM Serif Display', serif;
  text-align: center;
  border-radius: 15px;
  background-color: #ead2cf;
  border: 2px solid black;
  height: 540px;
  margin: 30px 45px;
  position: -webkit-sticky;
  position: sticky;
  top: 50px;
  a {
      color: black;
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
      isAdd: true,
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

  toggleToLook = () => {
    this.setState(() => ({
      isAdd: false
    }))
  };
  
  toggleToAdd= () => {
    this.setState(() => ({
      isAdd: true
    }))
  };


  render() {
    var alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    return (
      <Provider>
        <Container>
          {this.state.isAdd
          ? (
            <div>
              <ToggleBar>
                <div>Collect</div>
                <input id="toggle" type='checkbox' onClick={this.toggleToLook}/>
                <label for="toggle"/>
                <div>View</div>
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
                <div>Collect</div>
                <input id="toggle" type='checkbox' onClick={this.toggleToAdd}/>
                <label for="toggle"/>
                <div>View</div>
              </ToggleBar>
              <VocaList>
                <Router>
                <VocaSearch>
                  {alphabets.map((i) => {
                    return (
                      <HashLink smooth to={`#${i}`}>
                        {i.toUpperCase()}&nbsp;&nbsp;&nbsp;
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