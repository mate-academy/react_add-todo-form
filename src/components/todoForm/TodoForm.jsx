import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoForm.scss';

export class TodoForm extends React.Component {
  state = {
    newTodoTitle: '',
    newTodoUserId: 0,
    titleError: false,
    userError: false,
  };

  handleNameChange = (event) => {
    this.setState({
      newTodoTitle: event.target.value,
      titleError: false,
    });
  };

  handleAuthorChange = (event) => {
    this.setState({
      newTodoUserId: +event.target.value,
      userError: false,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      titleError: !state.newTodoTitle,
      userError: !state.newTodoUserId,
    }));

    const { newTodoTitle, newTodoUserId } = this.state;

    if (!newTodoTitle) {
      return;
    }

    if (!newTodoUserId) {
      return;
    }

    this.props.onAdd(newTodoTitle, newTodoUserId);

    this.setState({
      newTodoTitle: '',
      newTodoUserId: 0,
    });
  };

  render() {
    const {
      newTodoTitle,
      newTodoUserId,
      titleError,
      userError,
    } = this.state;

    return (
      <form
        onSubmit={this.handleFormSubmit}
        className="todo-form"
      >
        <h1>Add TODO</h1>
        <div>
          <input
            type="text"
            value={newTodoTitle}
            onChange={this.handleNameChange}
            className={classNames(
              'todo-form-input',
              { 'todo-form-input-error': titleError },
            )}
          />
          {titleError && (
            <p className="todo-form-error">
              Please enter the title
            </p>
          )}
        </div>

        <div>
          <select
            value={newTodoUserId}
            onChange={this.handleAuthorChange}
            className={classNames(
              'todo-form-select',
              { 'todo-form-select-error': userError },
            )}
          >
            <option>Choose a user</option>

            {this.props.users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {userError && (
            <p className="todo-form-error">
              Please choose a user
            </p>
          )}
        </div>

        <button
          type="submit"
          className="todo-form-button"
        >
          ADD TODO
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
