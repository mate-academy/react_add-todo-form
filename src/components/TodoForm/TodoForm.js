import React from 'react';
// import Component from 'react';

export default class TodoForm extends React.Component {
  state = {
    text: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      text: this.state.text,
    });
    this.setState({
      text: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="text"
          value={this.setState.text}
          onChange={this.handleChange}
          placeholder="i'm input"
        />
        <button type="button" onClick={this.handleSubmit}>add Todo</button>
      </form>
    );
  }
}
