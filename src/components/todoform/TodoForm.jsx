import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../shapes/UserShape';
import './TodoForm.scss';

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

    this.setState({
      [name]: type === 'text'
        ? value.replace(/[^\w ]+/, '')
        : value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;
    const { addTodo, users } = this.props;
    const trimTitle = title.trim();

    if (!trimTitle) {
      this.setState(state => (
        {
          errors: {
            ...state.errors,
            titleError: true,
          },
        }
      ));
    } else {
      this.setState(state => (
        {
          errors: {
            ...state.errors,
            titleError: false,
          },
        }
      ));
    }

    if (!userName) {
      this.setState(state => (
        {
          errors: {
            ...state.errors,
            userNameError: true,
          },
        }
      ));
    } else {
      this.setState(state => (
        {
          errors: {
            ...state.errors,
            userNameError: false,
          },
        }
      ));
    }

    if (trimTitle && userName) {
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
        onSubmit={this.handleSubmit}
        className="todos__form form"
      >
        <label
          htmlFor="title"
          className="form__label"
        >
          Enter the title
        </label>

        <input
          name="title"
          id="title"
          placeholder="Task"
          type="text"
          value={title}
          onChange={this.handleChange}
          className="form__input"
        />

        {errors.titleError
          && <span className="select__error">Please enter the title</span>
        }

        <label
          htmlFor="userName"
          className="form__label"
        >
          Choose a user
        </label>

        <select
          name="userName"
          id="userName"
          className="form__select select"
          value={userName}
          onChange={this.handleChange}
        >
          <option>Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
              vslue={user.name}
            >
              {user.name}
            </option>
          ))}
        </select>

        {
          errors.userNameError
            && <span className="select__error">Please choose a user</span>
        }

        <button
          type="submit"
          className="ui positive button form__button"
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
