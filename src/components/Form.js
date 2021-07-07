import React from 'react';
import PropTypes from 'prop-types';

import users from '../api/users';

export class Form extends React.Component {
  state = {
    newTitle: '',
    userId: '',
    newTitleValid: true,
    userIdValid: true,
  }

  handleSubmit = (e) => {
    const { userId, newTitle } = this.state;

    e.preventDefault();

    const newState = {
      newTitleValid: true,
      userIdValid: true,
    };

    if (!newTitle.match(/^[\w\s]+$/i) || newTitle.trim().length === 0) {
      newState.newTitleValid = false;
    }

    if (!userId) {
      newState.userIdValid = false;
    }

    if (!newState.newTitleValid || !newState.userIdValid) {
      this.setState({
        newTitleValid: newState.newTitleValid,
        userIdValid: newState.userIdValid,
      });

      return;
    }

    this.props.addTodo(
      newTitle,
      userId,
      users.find(user => user.id === userId),
    );

    this.setState({
      newTitle: '',
      userId: '',
    });
  }

  setStateOnChange = (key, value) => {
    this.setState({
      [`${key}Valid`]: true,
      [`${key}`]: value,
    });
  }

  render() {
    const { newTitle, userId, newTitleValid, userIdValid } = this.state;

    return (
      <>
        <form>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={e => this.setStateOnChange('newTitle', e.target.value)}
          />
          {' '}
          <select
            name="username"
            value={userId}
            onChange={e => this.setStateOnChange('userId', +(e.target.value))}
          >
            <option value="">Сhoose a user</option>
            {users.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
          {' '}
          <button type="submit" onClick={this.handleSubmit}>Add</button>
        </form>

        <div className="notification">
          <h2 className="notification__message">
            {!newTitleValid && 'Please enter the title'}
          </h2>
          <h2 className="notification__message">
            {!userIdValid && 'Please choose a user'}
          </h2>
        </div>
      </>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
