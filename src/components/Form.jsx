
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Form extends Component {
  state = {
    newTodoTitle: '',
    newUserName: '',
    hasTitleError: false,
    hasUserError: false,
  }

  handleTitleChange = (event) => {
    this.setState({
      newTodoTitle: event.target.value,
      hasTitleError: false,
    });
  }

  handleUserChange = (event) => {
    this.setState({
      newUserName: event.target.value,
      hasUserError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { newTodoTitle, newUserName } = this.state;

    if (newUserName && newTodoTitle) {
      const newTodo = {
        title: newTodoTitle,
        completed: false,
        user: {
          name: newUserName,
        },
      };

      this.props.addTodo(newTodo);

      this.setState({
        newTodoTitle: '',
        newUserName: '',
        hasTitleError: false,
        hasUserError: false,
      });
    }

    if (!this.state.newTodoTitle) {
      this.setState({ hasTitleError: true });
    }

    if (!this.state.newUserName) {
      this.setState({ hasUserError: true });
    }
  }

  render() {
    const {
      newTodoTitle,
      newUserName,
      hasTitleError,
      hasUserError,
    } = this.state;

    const { users } = this.props;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          name="newTodoTitle"
          onChange={this.handleTitleChange}
          value={newTodoTitle}
        />
        {hasTitleError && (
          <span>Please enter the title</span>
        )}
        <div>
          <select
            name="newUserName"
            onChange={this.handleUserChange}
            value={newUserName}
          >
            <option value="John Doe">Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && (
            <span>Please enter the title</span>
          )}
        </div>
        <button type="submit">Add Todo</button>
      </form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
