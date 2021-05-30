import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import users from '../../api/users';
import './AddTodoForm.css';

export class AddTodoForm extends React.Component {
  state = {
    newTodoId: 0,
    newTitle: '',
    hasTitleError: false,

    newUserId: 0,
    hasUserError: false,
  }

  handleTitleChange = (event) => {
    this.setState({
      newTitle: event.target.value,
      hasTitleError: false,
    });
  }

  handleUserChange = (event) => {
    this.setState({
      newUserId: +event.target.value,
      hasUserError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { newTitle, newUserId, newTodoId } = this.state;

    this.setState(state => ({
      hasTitleError: !state.newTitle,
      hasUserError: !state.newUserId,
      newTodoId: this.props.lengthForId + 1,
    }));

    if (!newTitle) {
      return;
    }

    if (!newUserId) {
      return;
    }

    this.props.onAdd(newTitle, newUserId, newTodoId);

    this.setState({
      newTitle: '',
      newUserId: 0,
    });
  };

  render() {
    const {
      newTitle,
      newUserId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="AddTodoForm">
        <form
          onSubmit={this.handleFormSubmit}
          className="form"
        >
          <div>
            <input
              className={classNames(`area`, {
                error: hasTitleError,
              })}
              type="text"
              value={newTitle}
              placeholder="Write a todo"
              onChange={this.handleTitleChange}
            />
            {hasTitleError && (
              <span style={{ color: 'red' }}>Please enter the title</span>
            )}
          </div>

          <div>
            <select
              className={classNames(`area`, {
                error: hasUserError,
              })}
              value={newUserId}
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
              <span style={{ color: 'red' }}>Please choose a user</span>
            )}
          </div>

          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

AddTodoForm.propTypes = {
  lengthForId: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};
