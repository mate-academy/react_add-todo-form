/* eslint-disable react/prop-types */
import React, { Component } from 'react';

export class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      text: '',
      selectedOption: 0,
      textError: null,
      selectError: null,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      text: target.value.trimStart(),
    });
  }

  handleSelect = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { selectedOption, text } = this.state;
    if (selectedOption < 1 || text.length < 1) {
      this.setState({
        selectError: selectedOption < 1 ? 'Please select User' : '',
        textError: text.length < 1 ? 'Please enter what needs Todo' : '',
      });
    } else {
      const newTodo = {
        userId: Number(selectedOption),
        id: this.props.todos.length + 1,
        title: text,
        completed: false,
      };

      this.props.addNewTodo(newTodo);

      this.setState({
        text: '',
        selectedOption: 0,
        textError: '',
        selectError: '',
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className=""
          type="text"
          onChange={this.handleChange}
          value={this.state.text}
          placeholder="blabla"
        />
        <select
          className=""
          value={this.state.selectedOption}
          onChange={event => this.handleSelect(event)}
        >
          <option value={0}>
            choose a user
          </option>
          {this.props.users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <p>
          {this.state.textError}
        </p>
        <p>
          {this.state.selectError}
        </p>
        <button type="submit">
          Add what to do
        </button>
        <h2>
          this is a new form with newtodo:
          {this.state.text}
        </h2>
        <p>{this.state.selectedOption}</p>
      </form>
    );
  }
}
