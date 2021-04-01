import React, { Component } from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';

export class TodoForm extends Component {
  state = {
    title: '',
    userId: '',
    selectedUser: null,
    selectedUserError: false,
    emptyTitleError: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, selectedUser } = this.state;
    const { todoId, addTodo } = this.props;

    const titleStatus = this.isValidData('title');
    const userStatus = this.isValidData('selectedUser');

    if (!titleStatus || !userStatus) {
      this.setState({
        emptyTitleError: !titleStatus,
        selectedUserError: !userStatus,
      });

      return;
    }

    addTodo(
      {
        title,
        userId: selectedUser.id,
        id: todoId,
        completed: false,
        user: selectedUser,
      },
    );

    this.setState({
      title: '',
      userId: '',
      selectedUser: null,
      selectedUserError: false,
      emptyTitleError: false,
    });
  };

  isValidData = key => !!this.state[key];

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
      emptyTitleError: false,
    });
  };

  handleSelectUser = (event) => {
    const userId = +event.target.value;

    this.setState({
      selectedUser: users.find(user => user.id === userId),
      selectedUserError: false,
      userId,
    });
  };

  render() {
    const { title, userId, selectedUserError, emptyTitleError } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="inputTitle">
          {`New todo `}
        </label>

        <input
          id="inputTitle"
          type="text"
          placeholder="Enter todo's title"
          value={title}
          onChange={this.handleChange}
        />
        <select
          value={userId}
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
