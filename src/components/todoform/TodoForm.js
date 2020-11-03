import React from 'react';
import PropTypes from 'prop-types';

import { UserShape } from '../shapes/UserShape';

export class TodoForm extends React.PureComponent {
  state = {
    title: '',
    userName: '',
    titleError: false,
    userNameError: false,
  }

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;
    const { addTodo, users } = this.props;

    if (!title.trim()) {
      this.setState({ titleError: true });
    }

    if (userName === 'Choose a user' || !userName) {
      this.setState({ userNameError: true });
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
      titleError,
      userNameError,
    } = this.state;

    return (
      <form
        className="ui form"
        onSubmit={this.handleSubmit}
      >

        <input
          name="title"
          id="title"
          placeholder="Task"
          type="text"
          value={title}
          onChange={this.handleChange}
          className="ui input"
        />

        {
          titleError
            ? (
              <span className="ui red pointing basic label">
                Please enter the title
              </span>
            )
            : (
              <label
                className="ui pointing label"
                htmlFor="title"
              >
                Enter the title
              </label>
            )
        }

        <div className="ui divider" />

        <select
          name="userName"
          id="userName"
          value={userName}
          onChange={this.handleChange}
          className="ui compact selection dropdown"
        >
          <option value="">Choose a user</option>
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
          userNameError
            ? (
              <span className="ui red pointing basic label">
                Please choose a user
              </span>
            )
            : (
              <label
                className="ui pointing label"
                htmlFor="userName"
              >
                Choose a user
              </label>
            )
        }

        <div className="ui divider" />

        <button
          type="submit"
          className="ui button"
          onClick={this.handleSubmit}
        >
          Add
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(UserShape).isRequired,
  addTodo: PropTypes.func.isRequired,
};
