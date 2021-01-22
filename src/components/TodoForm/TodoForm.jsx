import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './TodoForm.scss';

export class TodoForm extends React.Component {
  state = {
    values: {
      todoName: '',
      userId: 0,
    },
    errors: {
      todoName: false,
      userId: false,
    },
  }

  handleForm = (event) => {
    event.preventDefault();

    const { todoName, userId } = this.state.values;

    if (!todoName || !userId) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          todoName: !state.values.todoName,
          userId: !state.values.userId,
        },
      }));

      return;
    }

    this.setState({
      values: {
        todoName: '',
        userId: 0,
      },
      errors: {
        todoName: false,
        userId: false,
      },
    });

    this.props.addTodo(todoName, userId);
  }

  handleChange = (event) => {
    const { value, name, type } = event.target;

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: type === 'select-one'
          ? +value
          : value,
      },
      errors: {
        ...state.errors,
        [name]: false,
      },
    }));
  }

  render() {
    const { users } = this.props;
    const { todoName, userId } = this.state.values;

    return (
      <form
        action="./api/todos.js"
        method="POST"
        onSubmit={this.handleForm}
        className="form"
      >
        <div className="form__container">
          <label
            htmlFor="todoName"
            className="form__label"
          >
            Enter todo name here
          </label>

          <input
            type="text"
            name="todoName"
            value={todoName}
            onChange={this.handleChange}
            id="todoName"
            autoComplete="off"
            className={cn('form__input', {
              'form__input-error': this.state.errors.todoName,
            })}
          />

          {this.state.errors.todoName
          && (
            <div className="form__message-error">
              Please choose a title
            </div>
          )}
        </div>

        <div className="form__container">
          <label
            htmlFor="names"
            className="form__label"
          >
            Select Name
          </label>
          <select
            id="names"
            name="userId"
            value={userId}
            onChange={this.handleChange}
            className={cn('form__select', {
              'form__input-error': this.state.errors.userId,
            })}
          >
            <option value="0">Choose a name</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {this.state.errors.userId
          && (
            <div className="form__message-error">
              Please choose a user
            </div>
          )}
        </div>

        <button
          type="submit"
          className="form__button"
        >
          Add
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
};
