import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoList from '../TodoList';
import './TodoForm.css';

export class TodoForm extends Component {
  state = {
    todos: [...this.props.todos],
    name: '',
    userId: 0,
    title: '',
    maxTitleLength: 40,
    errorTitle: false,
    errorPersone: false,
    errorLength: false,
    errorNotValid: false,
  }

  handleTitleChange = ({ target }) => {
    const { maxTitleLength } = this.state;

    if (target.value.length > maxTitleLength) {
      this.setState({
        title: target.value.slice(0, maxTitleLength),
        errorLength: true,
        errorTitle: false,
        errorNotValid: false,
      });
    } else {
      this.setState({
        title: target.value,
        errorTitle: false,
        errorLength: false,
        errorNotValid: false,
      });
    }

    if (target.value.match(/[^A-Za-zА-Яа-я ]/)) {
      this.setState({
        errorNotValid: true,
        title: target.value.slice(0, target.value.search(/[^A-Za-zА-Яа-я ]/)),
      });
    }
  }

  personeSelection = ({ target }) => {
    const user = this.props.users.find(currentUser => (
      currentUser.name === target.value
    ));

    this.setState({
      name: target.value,
      userId: user.id,
      errorPersone: false,
    });
  }

  handleFormSubmit = (event, title, name, newID) => {
    event.preventDefault();
    if (title === '') {
      this.setState({
        errorTitle: true,
      });
    }

    if (name === '') {
      this.setState({
        errorPersone: true,
      });
    }

    if (title !== '' && name !== '') {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            userId: state.userId,
            id: newID,
            title: state.title,
            completed: false,
          },
        ],
        name: '',
        title: '',
        errorLength: false,
        errorNotValid: false,
      }));
    }
  }

  render() {
    const { name, todos, title, errorTitle, errorPersone,
      errorLength, errorNotValid } = this.state;
    const { users } = this.props;
    const identifiers = todos.map(todo => todo.id);
    const newID = Math.max(...identifiers) + 1;
    const preparedTodos = todos.map(todo => (
      {
        ...todo,
        user: users.find(user => todo.userId === user.id),
      }));

    return (
      <>
        <form
          action="#"
          method="GET"
          className="TodoForm"
          onSubmit={event => this.handleFormSubmit(event, title, name, newID)}
        >
          <label
            className="TodoForm__label"
            htmlFor="title"
          >
            Please enter task to be done:
          </label>
          <input
            name="title"
            type="text"
            id="title"
            value={title}
            onChange={this.handleTitleChange}
          />
          {errorTitle
          && (
            <p className="TodoForm__error">
              *Please enter the title
            </p>
          )}
          {errorLength
          && (
            <p className="TodoForm__error">
              *Maximum length exceeded
            </p>
          )}
          {errorNotValid
          && (
            <p className="TodoForm__error">
              *Only letters and spaces are allowed
            </p>
          )}
          <label
            className="TodoForm__label"
            htmlFor="personeName"
          >
            Choose a persone:
          </label>
          <select
            name="personeName"
            id="personeName"
            className="TodoForm__personeSelect"
            onChange={this.personeSelection}
            value={name}
          >
            <option>Choose a user</option>
            {users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          {errorPersone
          && (
            <p className="TodoForm__error">
              *Please choose a user
            </p>
          )}
          <button
            className="TodoForm__button"
            type="submit"
          >
            Add
          </button>
        </form>
        <TodoList todos={preparedTodos} />
      </>
    );
  }
}

TodoForm.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
  })),
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
};

TodoForm.defaultProps = {
  todos: [],
  users: [],
};
