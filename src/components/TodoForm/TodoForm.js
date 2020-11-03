import React from 'react';
import PropTypes from 'prop-types';

import { UserPropTypes } from '../propTypes/UserPropTypes';

export class TodoForm extends React.PureComponent {
  state = {
    title: '',
    userName: '',
    errors: {
      titleError: false,
      userNameError: false,
    },
  }

  handleChange = (event) => {
    const { name, value, type } = event.target;
    const errorName = `${name}Error`;

    this.setState(state => (
      {
        [name]: type === 'text'
          ? value.replace(/[^\w ]+/, '')
          : value,
        errors: {
          ...state.errors,
          [errorName]: false,
        },
      }
    ));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;
    const { addTodo, users } = this.props;

    if (!title.trim()) {
      this.setState(state => (
        {
          errors: {
            ...state.errors,
            titleError: true,
          },
        }
      ));
    }

    if (userName === 'Choose a user' || !userName) {
      this.setState(state => (
        {
          errors: {
            ...state.errors,
            userNameError: true,
          },
        }
      ));
    }

    if (title.trim() && userName) {
      const newUser = users.find(user => user.name === userName);

      this.setState({
        title: '',
        userName: '',
      });
      addTodo(title, newUser);
    }
  }

  render() {
    const { users } = this.props;
    const {
      title,
      userName,
      errors,
    } = this.state;

    return (
      <form
        className="m-3"
        onSubmit={this.handleSubmit}
      >
        <label
          htmlFor="title"
        >
          Enter the title:
        </label>

        <input
          name="title"
          id="title"
          placeholder="Task"
          type="text"
          value={title}
          onChange={this.handleChange}
          className="form-control"
        />

        {
          errors.titleError
            && (
              <span className="alert alert-danger d-block">
                Please enter the title
              </span>
            )
        }

        <label
          className="mt-3"
          htmlFor="userName"
        >
          Choose a user:
        </label>

        <select
          name="userName"
          id="userName"
          value={userName}
          onChange={this.handleChange}
          className="custom-select"
        >
          <option>Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.name}
            >
              {user.name}
            </option>
          ))}
        </select>

        {
          errors.userNameError
            && (
              <span className="alert alert-danger d-block">
                Please choose a user
              </span>
            )
        }

        <button
          type="submit"
          className="btn btn-primary mt-3"
        >
          Add
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(UserPropTypes).isRequired,
  addTodo: PropTypes.func.isRequired,
};
