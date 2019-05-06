import React from 'react';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  };

  render () {
    return (
      <div>
        <h2>Add a new voca</h2>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input name='name' placeholder='Voca name' 
            value={this.props.input_name} 
            onChange={this.props.onChange}
          />
          <input name='japanese' placeholder='Voca japanese' 
            value={this.props.input_japanese} 
            onChange={this.props.onChange}
          />
          <input type='submit' value='Add Voca'/>
        </form>
      </div>
    );
  }
}

export default InputForm;

