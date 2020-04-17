import React, { Component } from 'react';
import './TodoForm.css';
import { todosTypes, usersType, addNewTodoType } from '../../types/types';

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
    if (event.target.value === 0) {
      this.setState({
        selectError: 'Please select User',
      });
    } else {
      this.setState({
        selectedOption: event.target.value,
        selectError: '',
      });
    }
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
      <form className="todo-form" onSubmit={this.handleSubmit}>
        <input
          className="input-form"
          type="text"
          onChange={this.handleChange}
          value={this.state.text}
          placeholder="please, write a task"
        />
        <select
          className="select-form"
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
        <button className="form-button" type="submit">
          Add what to do
        </button>
        <p className="error-text">
          {this.state.textError}
        </p>
        <p className="error-select">
          {this.state.selectError}
        </p>
      </form>
    );
  }
}

TodoForm.propTypes = {
  todos: todosTypes.isRequired,
  users: usersType.isRequired,
  addNewTodo: addNewTodoType.isRequired,
};
