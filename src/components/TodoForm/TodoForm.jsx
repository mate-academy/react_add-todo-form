import React from 'react';
import { TodoFormType } from '../../types';
import './TodoForm.css';

const taskLengthLimit = 32;

export class TodoForm extends React.Component {
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

    if (value.length > taskLengthLimit) {
      return;
    }

    this.setState({
      [name]: type === 'text'
        ? value.replace(/[^\w] +/, '')
        : value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { addTodo, users } = this.props;
    const { title, userName } = this.state;
    const trimTitle = title.trim();

    if (!trimTitle) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          titleError: true,
        },
      }));
    } else {
      this.setState(state => ({
        errors: {
          ...state.errors,
          titleError: false,
        },
      }));
    }

    if (!userName) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          userNameError: true,
        },
      }));
    } else {
      this.setState(state => ({
        errors: {
          ...state.errors,
          userNameError: false,
        },
      }));
    }

    if (trimTitle && userName) {
      const newUser = users.find(
        user => user.name === userName,
      );

      this.setState({
        title: '',
        userName: '',
      });

      addTodo(title, newUser);
    }
  }

  render() {
    const { users } = this.props;
    const { title, userName, errors } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="app__form"
      >
        <div className="input-elements">
          <label htmlFor="title">
            Enter the title
          </label>

          <input
            type="text"
            name="title"
            id="title"
            placeholder="Task"
            value={title}
            onChange={this.handleChange}
            className="input is-small is-primary"
          />

          {errors.titleError
            && <span className="title-error">Please enter the title</span>
          }
        </div>

        <div className="input-elements">
          <label htmlFor="user-name">
            Choose a user
          </label>

          <div className="control">
            <div className="select is-primary is-small">
              <select
                name="userName"
                id="user-name"
                value={userName}
                onChange={this.handleChange}
                className="select is-primary"
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
            </div>
          </div>

          {errors.userNameError
            && <span className="username-error">Please choose a user</span>
          }
        </div>

        <button
          className="button is-primary is-small"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = TodoFormType;
