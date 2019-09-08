import React from 'react'
import styled, {css} from 'styled-components';
import InputForm from './InputForm'
import AlphabetBox from './AlphabetBox'
import EachVoca from './EachVoca'
import { Provider } from '../context';
import update from 'immutability-helper';

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
`



class Vocas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vocas: this.props.vocas,
      text: null,
      input_name: '',
      input_japanese: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewVoca = this.addNewVoca.bind(this);
    this.fillInWord = this.fillInWord.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'name') {
      this.setState({
        input_name: e.target.value
      })
    } else {
      this.setState({
        input_japanese: e.target.value
      })
    }
  }
  
  handleFormSubmit() {
    var voca = {name: this.state.input_name, japanese: this.state.input_japanese}
    $.post('/vocas',{voca: voca})
      .done((data) => {
        this.addNewVoca(data);
      });
  }

  addNewVoca (voca) {
    var vocas = update(this.state.vocas, {$push: [voca]})
    //console.log(vocas);
    this.setState({
      vocas: vocas.sort((a,b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
        });
  }

  fillInWord (e) {
    console.log(e);
    this.setState({
      input_name: e
    });
  }
  
  render() {
    var alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    return (
      <Provider>
        <Container>
          <div>
            <InputForm
            input_name = {this.state.input_name}
            input_japanese = {this.state.input_japanese}
            onChange = {this.handleChange}
            fillInWord = {this.fillInWord}
            onFormSubmit = {this.handleFormSubmit}
            />
          </div>
          <div>
          {alphabets.map((i) => {
            return (
              <div>
              <AlphabetBox
                alp = {i.toUpperCase()}
              />
              {this.state.vocas.map ((voca) => {
                if (voca.name[0] === i) {
                  return (
                    <EachVoca
                    key = {voca.id}
                    name = {voca.name}
                    japanese = {voca.japanese}
                  />
                  );
                }
              })}
              </div>
            );})}
          </div>
        </Container>
      </Provider>
    );}
  }

export default Vocas;