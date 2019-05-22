
import React from 'react'
import InputForm from './InputForm'
import AlphabetBox from './AlphabetBox'
import EachVoca from './EachVoca'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from '../context';
import update from 'immutability-helper';



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
    console.log(voca)
    $.post('/vocas',{voca: voca})
      .done((data) => {
        this.addNewVoca(data);
      });
  }

  addNewVoca (voca) {
    var vocas = update(this.state.vocas, {$push: [voca]})
    this.setState({
      vocas: vocas.sort((a,b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
        });
      console.log(vocas);
  }
  
  render() {
    var alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    return (
      <Provider>
        <Router>
          <div>
            <div>
              <InputForm
                input_name = {this.state.input_name}
                input_japanese = {this.state.input_japanese}
                onChange = {this.handleChange}
                onFormSubmit = {this.handleFormSubmit}
              />
            </div>
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
        </Router>
      </Provider>
    );}
  }

export default Vocas;