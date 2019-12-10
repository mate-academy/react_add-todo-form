import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class TodoForm extends React.Component {
  state = {
    text: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log("something is changed");
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   this.props.onSubmit();
  // }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="todo..."
        />
      </form>
    );
  }
}
