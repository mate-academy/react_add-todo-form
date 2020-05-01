import React, { Component } from 'react';
import './NewTodo.css';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  state = {
    newTask: '',
    userId: 1,
    messageText: '',
    messageIsVisible: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { newTask, userId } = this.state;

    if (newTask.length === 0) {
      this.setState({
        messageText: '*cannot be empty',
        messageIsVisible: true,
      });

      return;
    }

    if (newTask.length < 10) {
      this.setState({
        messageText: '*min length is 10 symbols',
        messageIsVisible: true,
      });

      return;
    }

    this.props.newTodo(newTask, userId);
    this.setState({
      newTask: '',
      userId: 1,
    });
  }

  handleNewTaskInput = (e) => {
    this.setState({ messageIsVisible: false });
    this.setState({ newTask: e.target.value });
  }

  handleUserIdInput = (e) => {
    this.setState({ userId: +e.target.value });
  }

  render() {
    const { users } = this.props;
    const { newTask, userId, messageText, messageIsVisible } = this.state;

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
              size={37}
              maxLength={30}
            />
          </label>
          {messageIsVisible && (
            <div className="newtodo__item-message">
              {messageText}
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
