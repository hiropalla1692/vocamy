import React from 'react';
import styled, {css} from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  border-radius: 15px;
  padding: 8% 8%;
  border: 2px solid black;
  box-shadow: 6px 6px black;
  background-color: #c1b1cf;
  background-size: cover;
  font-family: 'Jost', sans-serif;
`
const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  flex: 0 1 20%;
  ul {
    display: flex;
    text-align: left;
    margin: 4% 0;
    padding: 0;
  }
  ul > label {
    flex: 0 0 50%;
    max-width: 80px;
    font-size: 18px;
  }
  ul > label + * {
    flex: 0 0 50%;
    border: 0px;
    border-bottom: 2px solid black;
    box-shadow: none;
    padding: 1px;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; 
    background-color: #c1b1cf;
    font-family: 'Jost', sans-serif;
    font-size: 16px;
    :focus {
      border-bottom: 2px solid #ebd3c0;
      transition: all 0.2s;
    }
    ::placeholder {
    color: white;
    background-color: #c1b1cf;
  }
}
`

const Input = styled.input`

`

const Label = styled.label`
  font-family: 'DM Serif Display', serif;
  position: relative;
  font-size: 14px;
`

const Button = styled.button`
  display: inline-block;
  border-radius: 1px;
  padding: 0.5rem 0;
  width: 6rem;
  background: black;
  color: white;
  border: 1px solid black;
  font-family: 'DM Serif Display', serif;
  font-size: 16px;
  &:hover{
    transition: 0.2s all ease-in-out;
    background-color: #ebd3c0;
    color: black;
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
  font-family: 'DM Serif Display', serif;
  margin-block-start: 0.2em;
  margin-block-end: 0.2em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`

class AddVoca extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    let returnButtonText = () => document.getElementById("addvoca").innerHTML="+&nbsp;&nbsp;Voca🥑";
    e.preventDefault();
    document.getElementById("addvoca").innerHTML="Done!";
    this.props.onFormSubmit();
    setTimeout(returnButtonText, 4000);
  };



  render () {
    return (
          <React.Fragment>
            <Container>
              <Bigtext>Let's Add New Voca</Bigtext>
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
                    <Button type='submit' id='addvoca'>+&nbsp;Voca</Button>
                  </div>
                </StyledForm>
              </form>
            </Container>
          </React.Fragment>
    );
  }
}

export default AddVoca;
