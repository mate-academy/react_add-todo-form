import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NewTodo.css';

export class NewTodo extends React.Component {
  state = {
    newTodoText: '',
    selectedUserId: 0,
    hasTextError: false,
    hasUserError: false,
  };

  handleInputChange = (event) => {
    this.setState({
      hasTextError: false,
      newTodoText: event.target.value,
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      hasUserError: false,
      selectedUserId: +event.target.value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTodoText, selectedUserId } = this.state;

    if (!newTodoText || !selectedUserId) {
      if (!newTodoText) {
        this.setState({
          hasTextError: true,
        });
      }

      if (!selectedUserId) {
        this.setState({
          hasUserError: true,
        });
      }

      return;
    }

    if (!(/^[a-zA-z0-9а-яА-Я\s]+$/).test(newTodoText)
        || (/^\s*$/).test(newTodoText)) {
      this.setState({
        hasTextError: true,
      });

      return;
    }

    const newTodo = {
      title: newTodoText,
      user: this.props.findUserById(this.state.selectedUserId),
      completed: false,
      id: this.props.lastTodoId + 1,
    };

    this.props.addNewTodo(newTodo);

    this.setState({
      selectedUserId: 0,
      newTodoText: '',
    });
  }

  render() {
    const {
      newTodoText,
      selectedUserId,
      hasTextError,
      hasUserError,
    } = this.state;

    return (
      <form className="form" onSubmit={this.handleFormSubmit}>
        <div className="form__input">
          <input
            className={classNames('form__input_textarea',
              { 'form__input_textarea--error': hasTextError })}
            type="text"
            value={newTodoText}
            onChange={this.handleInputChange}
            maxLength={100}
            placeholder="Add new task"
          />

          {hasTextError && (
            <span className="form__error">Please add a new task</span>
          )}
        </div>

        <div className="form__select">
          <select
            className={classNames('form__select_values',
              { 'form__select_values--error': hasUserError })}

            value={selectedUserId}
            onChange={this.handleSelectChange}
          >
            <option value="0" hidden>
              Select a user
            </option>
            {this.props.users.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="form__error">Please select a user</span>
          )}
        </div>

        <button type="submit" className="form__btn">
          Add new task
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  addNewTodo: PropTypes.func.isRequired,
  findUserById: PropTypes.func.isRequired,
  lastTodoId: PropTypes.number.isRequired,
};
