import React from 'react';
import PropTypes from 'prop-types';

import users from '../api/users';

export class Form extends React.Component {
  state = {
    newTitle: '',
    userId: 0,
    newUser: '',
    titleValid: true,
    userValid: true,
  }

  handleSubmit = (e) => {
    const { userId, newTitle } = this.state;

    e.preventDefault();

    this.setState((state) => {
      const newState = {};

      if (!newTitle.match(/^[\w\s]+$/i)) {
        newState.titleValid = false;
      } else {
        newState.titleValid = true;
      }

      if (userId === 0) {
        newState.userValid = false;
      } else {
        newState.userValid = true;
      }

      return newState;
    }, () => {
      const { titleValid, userValid } = this.state;

      if (titleValid && userValid) {
        this.setState({
          newUser: users.find(user => user.id === userId),
        }, () => {
          const { newUser } = this.state;

          this.props.addTodo(newTitle, userId, newUser);
          this.setState({
            newTitle: '',
          });
        });
      }
    });
  }

  render() {
    const { titleValid, userValid } = this.state;

    return (
      <>
        <form>
          <input
            type="text"
            placeholder="Title"
            value={this.state.newTitle}
            onChange={(e) => {
              this.setState({
                newTitle: e.target.value,
              });
            }}
          />
          {' '}
          <select
            name="username"
            onChange={(e) => {
              this.setState({
                userId: +(e.target.value),
              });
            }}
          >
            <option value="0">Сhoose a user</option>
            {users.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
          {' '}
          <button type="submit" onClick={this.handleSubmit}>Add</button>
        </form>

        <div className="notification">
          <h2>{!titleValid ? 'Please enter the title' : null}</h2>
          <h2>{!userValid ? 'Please choose a user' : null}</h2>
        </div>
      </>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
