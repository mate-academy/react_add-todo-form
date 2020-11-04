import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.scss';

import { UserShape } from '../../shapes/UserShape';

export class TodoForm extends React.PureComponent {
  state = {
    title: '',
    userName: '',
    titleError: false,
    userNameError: false,
  }

  valueFormatting = value => value.replace(/[^\w ]+/, '')

  handleChange = (event) => {
    const { name, value, type } = event.target;

    this.setState({
      [name]: type === 'text'
        ? this.valueFormatting(value)
        : value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;
    const { addTodo, users } = this.props;

    if (!title) {
      this.setState({ titleError: true });
    }

    if (userName === 'Choose a user' || !userName) {
      this.setState({ userNameError: true });
    }

    if (title && userName) {
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
    const { title, userName, titleError, userNameError } = this.state;

    return (
      <form className="TodoForm" onSubmit={this.handleSubmit}>
        <label className="TodoForm__label" htmlFor="title">
          Enter the title
        </label>

        <input
          name="title"
          id="title"
          placeholder="Task"
          type="text"
          value={title}
          onChange={this.handleChange}
          className="TodoForm__field"
        />

        {
          titleError
            ? <span className="TodoForm__error">Please enter the title</span>
            : ''
        }

        <label
          className="TodoForm__label"
          htmlFor="userName"
        >
          Choose a user
        </label>

        <select
          name="userName"
          id="userName"
          value={userName}
          onChange={this.handleChange}
          className="TodoForm__field"
        >
          <option>Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>

        {
          userNameError
            ? <span className="TodoForm__error">Please choose a user</span>
            : ''
        }

        <button
          type="submit"
          className="TodoForm__submit"
        >
          Add task
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(UserShape).isRequired,
  addTodo: PropTypes.func.isRequired,
};
