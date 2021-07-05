import React from 'react';
import PropTypes from 'prop-types';

import users from '../api/users';

export class Form extends React.Component {
  state = {
    newTitle: '',
    userId: 0,
    newUser: '',
  }

  handleSubmit = (e) => {
    const { userId } = this.state;

    e.preventDefault();

    return this.setState({
      newUser: users.find(user => user.id === userId),
    }, () => {
      const { newTitle, newUser } = this.state;

      this.props.addTodo(newTitle, userId, newUser);
    });
  }

  render() {
    return (
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
          <option value={0}>Сhoose a user</option>
          {users.map(user => (
            <option value={user.id}>{user.name}</option>
          ))}
        </select>
        {' '}
        <button type="submit" onClick={this.handleSubmit}>Add</button>
      </form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
