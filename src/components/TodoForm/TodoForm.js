import React, { Component } from 'react';
import './TodoForm.css';
import { todosTypes, usersType, addNewTodoType } from '../../types/types';

export class TodoForm extends Component {
    state = {
      text: '',
      selectedOption: 0,
      textError: null,
      selectError: null,
    };

  handleChange = ({ target }) => {
    if (!target.value) {
      this.setState({
        textError: 'Please, enter what needs to do',
      });
    }

    this.setState({
      text: target.value.trimStart(),
      textError: null,
    });
  }

  handleSelect = (event) => {
    if (event.target.value === 0) {
      this.setState({
        selectError: 'Please, select a User',
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
        selectError: selectedOption < 1 ? 'Please, select a User' : '',
        textError: text.length < 1 ? 'Please, enter what needs to do' : '',
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
          className="form-input"
          type="text"
          onChange={this.handleChange}
          value={this.state.text}
          placeholder="please, write a task"
        />
        <select
          className="form-select"
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
          Add
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
