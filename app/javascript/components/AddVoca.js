import React from 'react';
import styled, {css} from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 4%;
  padding: 16px;
  border: solid pink;
  background-size: cover;
  font-family: 'Source Sans Pro', sans-serif;
`
const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  flex: 0 1 20%;
ul {
  display: flex;
}
ul > label {
  flex: 1 0 10px;
  max-width: 60px;
}
ul > label + * {
  flex: 0 0 10%;
}
`

const Input = styled.input`
  position: relative; 
  margin: 0;
  width: 12em;
  background-color: white;
  border: solid 1px black;
  padding: 1px;
  outline: none;
  transition: 0.2s all;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; 
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;

  &.focus{
    border: solid 1px #0ecb27;
    transition: 0.2s all ease-in-out;
    ::placeholder{
      color: transparent;
      transition: 0.2s all ease-in-out;
    }
  }
`

const Label = styled.label`
  font-family: 'Source Sans Pro', sans-serif;
  position: relative;
  font-size: 14px;
`

const Button = styled.button`
  display: inline-block;
  border-radius: 1px;
  padding: 0.5rem 0;
  margin: 0.5rem 0.5rem;
  width: 6rem;
  background: transparent;
  color: #0ecb27;
  border: 1px solid #0ecb27;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 15px;
  &:hover{
    transition: 0.2s all ease-in-out;
    background: #0ecb27;
    color: white;
  }
  &:focus{
    outline: 0;
  }
  &:active{
    background: pink;
    transition: 0.2s all ease-in-out;
  }
`
const Bigtext = styled.h2`
  display: block;
  margin-block-start: 0.2em;
  margin-block-end: 0.2em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`

class AddVoca extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    let returnButtonText = () => document.getElementById("addvoca").innerHTML="+&nbsp;&nbsp;Voca🥑";
    e.preventDefault();
    document.getElementById("addvoca").innerHTML="Done😎";
    this.props.onFormSubmit();
    setTimeout(returnButtonText, 4000);
  };



  render () {
    return (
          <React.Fragment>
            <Container>
            <Bigtext>Let's Add New Voca💸</Bigtext>
            <form onSubmit={(e)=>this.handleSubmit(e)} autoComplete="off">
              <StyledForm>
                <ul>
                  <Label>Voca</Label>
                  <Input 
                    id = 'name'
                    name='input_name' 
                    placeholder='単語をクリック!' 
                    value={this.props.input_name} 
                    onChange={this.props.onChange}
                    onFocus={() => this.setState({ active: true })}
                    onBlur={() => this.setState({ active: false })}
                  ></Input>
                </ul>
                <ul>
                  <Label>Meaning</Label>
                  <Input
                    name='input_japanese' 
                    placeholder='訳語を記入しよう!' 
                    value={this.props.input_japanese} 
                    onChange={this.props.onChange}
                    onFocus={() => this.setState({ active: true })}
                    onBlur={() => this.setState({ active: false })}
                  ></Input>
                </ul>
                <div>
                  <Button type='submit' id='addvoca'>+&nbsp;&nbsp;Voca🥑</Button>
                </div>
              </StyledForm>
              </form>
            </Container>
          </React.Fragment>
    );
  }
}

export default AddVoca;
