import React from 'react';
import './NewTodo.css';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  state = {
    title: '',
    userId: 0,
    error: false,
  }

  validateForm = (event) => {
    event.preventDefault();
    const { title, userId } = this.state;

    if (title && userId) {
      const newTask = {
        title,
        userId,
        completed: false,
      };

      this.props.addNewTodo(newTask);

      this.setState(() => ({
        title: '',
        userId: 0,
        error: false,
      }));
    } else if (!this.state.title || !this.state.user) {
      this.setState({
        error: true,
      });
    }
  }

  handleInputChange = (event) => {
    const title = event.target.value.trim();

    this.setState({
      title,
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      userId: +event.target.value,
    });
  }

  render() {
    const { error, title, userId } = this.state;

    return (
      <form onSubmit={this.validateForm}>
        <label>
        Task:
          <input
            value={this.state.title}
            placeholder="Enter your task"
            onChange={this.handleInputChange}
          />
        </label>
        <select
          value={this.state.userId}
          placeholder="Choose a user"
          onChange={this.handleSelectChange}
        >
          <option>Choose a user</option>
          {this.props.users.map(user => (
            <option
              key={user.phone}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
        >
          Add task
        </button>
        <div className={!error ? 'errors__show errors' : 'errors__hide errors'}>
          <div
            className={!userId ? 'errors__show-user' : 'errors__hide-user'}
          >
            Please choose a user
          </div>
          <div
            className={!title ? 'errors__show-title' : 'errors__hide-title'}
          >
            Please enter the title
          </div>
        </div>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};
