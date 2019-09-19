import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import users from '../../api/users';

export default class NewTodo extends Component {
  state = {
    title: '',
    userId: 0,
    titleError: '',
    userIdError: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.userId < 1) {
      this.setState({
        userIdError: 'Please chose the User',
      });
    } else if (this.state.title.length < 1) {
      this.setState({
        titleError: 'Please enter the Title',
      });
    } else {
      const { userId, title } = this.state;
      const { addTodo } = this.props;

      const newTodo = {
        title,
        userId,
      };

      addTodo(newTodo);

      this.setState({
        title: '',
        userId: 0,
      });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value.replace(/[^A-Za-z0-9 ]/g, ''),
      userIdError: '',
      titleError: '',
    });
  }

  render() {
    const {
      title, userId, titleError, userIdError,
    } = this.state;
    const { users } = this.props;

    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="form-todo"
        >
          <div className="form-group">
            <label htmlFor="todo-title">Please enter Todo title:</label>
            <input
              className="form-control"
              id="todo-title"
              type="text"
              value={title}
              name="title"
              placeholder="Enter Todo Title"
              onChange={this.handleChange}
            />
          </div>
          <select
            className="form-control mb-2"
            value={userId}
            onChange={this.handleChange}
            name="userId"
          >
            <option value={0} disabled>Choose a user</option>
            {users.map(user => (
              <option value={user.id}>
                {user.id}
                {' '}
                {user.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="btn btn-primary mb-2"
          >
            Add ToDo
          </button>
          <div
            className="error"
            style={userIdError.length > 0
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }}
          >
            {userIdError.length > 0
              ? userIdError
              : 'default'}
          </div>
          <div
            className="error"
            style={titleError.length > 0
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }}
          >
            {titleError.length > 0
              ? titleError
              : 'default'}
          </div>
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
