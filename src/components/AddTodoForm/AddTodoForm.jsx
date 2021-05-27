import React from 'react';
import PropTypes from 'prop-types';

import './AddTodoForm.scss';

import users from '../../api/users';

export class AddTodoForm extends React.Component {
  state = {
    newTodoName: '',
    hasTodoNameError: false,

    newTodoUserId: 0,
    hasUserError: false,
  };

  handleTodoNameChange = (event) => {
    this.setState({
      newTodoName: event.target.value,
      hasTodoNameError: false,
    });
  };

  handleUserChange = (event) => {
    this.setState({
      newTodoUserId: +event.target.value,
      hasUserError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      hasTodoNameError: !state.newTodoName,
      hasUserError: !state.newTodoUserId,
    }));

    const { newTodoName, newTodoUserId } = this.state;

    if (!newTodoName) {
      return;
    }

    if (!newTodoUserId) {
      return;
    }

    this.props.onAdd(newTodoName, newTodoUserId);

    this.setState({
      newTodoName: '',
      newTodoUserId: 0,
    });
  };

  render() {
    const {
      newTodoName,
      hasTodoNameError,
      newTodoUserId,
      hasUserError,
    } = this.state;

    return (
      <div className="add-todo">
        <form className="add-todo__container" onSubmit={this.handleFormSubmit}>
          <div className="add-todo__field-wrap">
            <input
              className="add-todo__field"
              placeholder="write new TODO here..."
              type="text"
              value={newTodoName}
              onChange={this.handleTodoNameChange}
            />
            {hasTodoNameError && (
              <p className="add-todo__error">
                *please enter the title
              </p>
            )}
          </div>
          <div className="add-todo__field-wrap">
            <select
              className="add-todo__field"
              value={newTodoUserId}
              onChange={this.handleUserChange}
            >
              <option>Choose a user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {hasUserError && (
              <p className="add-todo__error">
                *please choose a user
              </p>
            )}
          </div>
          <button className="add-todo__field" type="submit">
            Add ToDo
          </button>
        </form>
      </div>
    );
  }
}

AddTodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
