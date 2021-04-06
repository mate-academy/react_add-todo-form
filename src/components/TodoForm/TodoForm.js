import React, { Component } from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';

export class TodoForm extends Component {
  state = {
    isUserError: false,
    isTitleError: false,
    todo: {
      title: '',
      completed: false,
      user: null,
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { todo } = this.state;

    const isTitleEmpty = !todo.title;
    const noUserSelected = !todo.user;

    if (isTitleEmpty || noUserSelected) {
      this.setState({
        isTitleError: isTitleEmpty,
        isUserError: noUserSelected,
      });

      return;
    }

    this.props.addTodo(todo);

    this.setState({
      isUserError: false,
      isTitleError: false,
      todo: {
        title: '',
        user: null,
        completed: false,
      },
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      todo: {
        ...prevState.todo,
        [name]: value,
      },
      isTitleError: false,
    }));
  };

  handleSelectUser = (event) => {
    const userId = +event.target.value;

    this.setState(prevState => ({
      todo: {
        ...prevState.todo,
        user: users.find(user => user.id === userId),
        userId,
      },
      isUserError: false,
    }));
  };

  render() {
    const { todo, isUserError, isTitleError } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="inputTitle">
          {`New todo `}
        </label>

        <input
          id="inputTitle"
          type="text"
          placeholder="Enter todo's title"
          value={todo.title}
          name="title"
          onChange={this.handleChange}
        />
        <select
          value={todo.user ? todo.user.id : ''}
          onChange={this.handleSelectUser}
        >
          <option value="">
            Choose a user
          </option>
          {users.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit">
          Add
        </button>

        {isTitleError
          && (
            <p className="App__error-message">
              Please enter the title
            </p>
          )
        }

        {isUserError
          && (
            <p className="App__error-message">
              Please choose a user
            </p>
          )
        }
      </form>
    );
  }
}

TodoForm.propTypes = {
  // todoId: PropTypes.number.isRequired,
  addTodo: PropTypes.func.isRequired,
};
