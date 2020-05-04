import React, { Component } from 'react';
import './NewTodo.css';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  state = {
    newTask: '',
    userId: 0,
    titleErrorMgs: '',
    usersErrorMsg: '',

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { newTask, userId } = this.state;
    const newTodo = {
      userId,
      title: newTask,
      completed: false,
    };

    if (newTask.length === 0) {
      this.setState({
        titleErrorMgs: '*cannot be empty',
      });

      return;
    }

    if (userId === 0) {
      this.setState({
        usersErrorMsg: '*choose a user for this task',
      });

      return;
    }

    this.props.addTodo(newTodo);
    this.setState({
      newTask: '',
      userId: 0,
    });
  }

  handleTitleInput = (e) => {
    this.setState({ newTask: e.target.value });
    this.setState({ titleErrorMgs: '' });
  }

  handleUserIdInput = (e) => {
    this.setState({ userId: +e.target.value });
    this.setState({ usersErrorMsg: '' });
  }

  render() {
    const { users } = this.props;
    const { newTask, userId, titleErrorMgs, usersErrorMsg } = this.state;

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
              onChange={this.handleTitleInput}
              className="newtodo__item-input"
              type="text"
              placeholder="Enter task here"
              size={37}
              maxLength={30}
              minLength={10}
            />
          </label>
          {titleErrorMgs && (
            <div className="newtodo__item-message">
              {titleErrorMgs}
            </div>
          )}
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
                <option value="0" defaultValue>Choose a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {usersErrorMsg && (
                <div className="newtodo__item-message">
                  {usersErrorMsg}
                </div>
              )}
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
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default NewTodo;
