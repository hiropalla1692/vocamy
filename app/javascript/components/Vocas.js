
import React from 'react'
import InputForm from './InputForm'
import AlphabetBox from './AlphabetBox'
import EachVoca from './EachVoca'



class Vocas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vocas: this.props.vocas,
      text: null,
      input_name: '',
      input_japanese: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
  };
  
  handleFormSubmit() {
    var voca = {name: this.state.input_name, japanese: this.state.input_japanese}
    $.post('/vocas',{voca: voca});
  };
  
  render() {
    var alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    return (
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
              alp = {i}
            />
            {this.props.vocas.map ((voca) => {
              if (voca.name[0] === i) {
                return (
                  <EachVoca
                  name = {voca.name}
                  japanese = {voca.japanese}
                />
                );
              }
            })}
            </div>
          );})}
      </div>
    );}
  }

export default Vocas;