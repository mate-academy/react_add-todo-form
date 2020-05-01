import React, { Component } from 'react';
import './NewTodo.css';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  state = {
    newTask: '',
    userId: 1,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { newTask, userId } = this.state;

    this.props.newTodo(newTask, userId);
    this.setState({
      newTask: '',
      userId: 1,
    });
  }

  handleNewTaskInput = (e) => {
    this.setState({ newTask: e.target.value });
  }

  handleUserIdInput = (e) => {
    this.setState({ userId: +e.target.value });
  }

  render() {
    const { users } = this.props;
    const { newTask, userId } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit} className="newtodo__item">
          <label>
            <span
              className="newtodo__item-task"
            >
              Task:
            </span>
            <input
              value={newTask}
              onChange={this.handleNewTaskInput}
              className="newtodo__item-input"
              type="text"
              placeholder="Enter task here"
              maxLength={30}
              minLength={10}
              size={30}
              required
            />
          </label>
          <div className="newtodo__item-name">
            <label>
              <span className="newtodo__item-subtitle">
                Performer:
              </span>
              <select
                value={userId}
                onChange={this.handleUserIdInput}
                className="newtodo__item-users"
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            className="newtodo__button"
            type="submit"
          >
            Add new task
          </button>
        </form>
      </>
    );
  }
}

NewTodo.propTypes = {
  newTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default NewTodo;
