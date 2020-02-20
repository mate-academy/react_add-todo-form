import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTodo.css';

export class NewTodo extends Component {
  state = {
    users: this.props.users,
    id: 3,
    title: '',
    userId: 0,
    errors: false,
  }

  handleUserId = (event) => {
    this.setState({
      userId: Number(event.target.value),
    });
  }

  handleChange = (event) => {
    const title = event.target.value.replace(/^\s/, '');

    if (title.length < 100) {
      this.setState({
        title,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userId, id } = this.state;

    if (title.length > 0 && userId > 0) {
      const newTask = {
        id,
        title,
        userId,
        completed: false,
      };

      this.props.updateTodos(newTask);

      this.setState(prevState => ({
        title: '',
        userId: 0,
        errors: false,
        id: prevState.id + 1,
      }));
    } else {
      this.setState({
        errors: true,
      });
    }
  }

  render() {
    const { title, users, userId, errors } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="todo-list__adder task-adder"
      >
        <input
          type="text"
          value={title}
          placeholder="Add yout task"
          className="task-adder__input adder-input"
          onChange={this.handleChange}
        />
        <select
          onChange={this.handleUserId}
          className="task-adder__user-select adder-input"
          value={userId}
        >
          <option
            value="0"
            disabled
            className="task-adder__user-select"
          >
            Choose a user
          </option>
          {users.map(user => (
            <option
              value={user.id}
              key={user.username}
              className="task-adder__user-select"
            >
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit" className="task-adder__task-submit">
          Add task
        </button>
        <div className={
          !errors
            ? 'task-adder__errors--hidden errors'
            : 'task-adder__errors errors'
        }
        >
          <div className={
            title.length !== 0
              ? 'errors__title--hidden'
              : 'errors__title'
          }
          >
            Please enter the title
          </div>
          <div className={
            userId !== 0
              ? 'errors__user--hidden'
              : 'errors__user'
          }
          >
            Please choose a user
          </div>
        </div>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  updateTodos: PropTypes.func.isRequired,
};
