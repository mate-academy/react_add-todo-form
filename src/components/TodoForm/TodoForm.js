import React, { Component } from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';

export class TodoForm extends Component {
  state = {
    selectedUserError: false,
    emptyTitleError: false,
    todo: {
      title: '',
      completed: false,
      user: null,
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { todo } = this.state;

    const titleStatus = !todo.title;
    const userStatus = !todo.user;

    if (titleStatus || userStatus) {
      this.setState({
        emptyTitleError: titleStatus,
        selectedUserError: userStatus,
      });

      return;
    }

    this.props.addTodo(
      {
        ...todo,
        id: this.props.todoId,
      },
    );

    this.setState({
      selectedUserError: false,
      emptyTitleError: false,
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
      emptyTitleError: false,
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
      selectedUserError: false,
    }));
  };

  render() {
    const { todo, selectedUserError, emptyTitleError } = this.state;

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

        <button
          type="submit"
        >
          Add
        </button>

        {emptyTitleError
          && (
            <p className="App__error-message">
              Please enter the title
            </p>
          )
        }

        {selectedUserError
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
  todoId: PropTypes.number.isRequired,
  addTodo: PropTypes.func.isRequired,
};
