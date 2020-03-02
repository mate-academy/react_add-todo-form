import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export class NewTodo extends React.Component {
  state = {
    currentUserId: 0,
    currentTask: '',
    taskError: false,
    userIdError: false,
  }

  handleTaskChange = ({ target: { value } }) => {
    this.setState({
      currentTask: value.trimStart(),
      taskError: false,
    });
  }

  handleUserId = ({ target: { value } }) => {
    this.setState({
      currentUserId: Number(value),
      userIdError: false,
    });
  }

  addTask = () => {
    const { currentUserId, currentTask } = this.state;
    const { todos } = this.props;

    if (currentUserId === 0 || currentTask === '') {
      this.setState({
        taskError: currentTask === '',
        userIdError: currentUserId === 0,
      });
    } else {
      this.props.addTask({
        taskIndex: todos[todos.length - 1].taskIndex + 1,
        id: uuidv4(),
        userId: currentUserId,
        title: currentTask,
      });
      this.resetState();
    }
  }

  resetState = () => {
    this.setState({
      currentUserId: 0,
      currentTask: '',
      taskError: false,
      userIdError: false,
    });
  }

  render() {
    const { users } = this.props;
    const { userIdError, taskError } = this.state;

    return (
      <div className="new-todo">
        <input
          onChange={this.handleTaskChange}
          value={this.state.currentTask}
          type="text"
          placeholder="new task"
        />

        <select
          onChange={this.handleUserId}
          value={this.state.currentUserId}
        >
          <option value={0}>Choose user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <button type="button" onClick={this.addTask}>
          Add Task
        </button>
        <div>
          {taskError ? (
            <span
              className="error-message"
            >
              {`Enter task `}
            </span>
          ) : ''}
          {userIdError ? (
            <span
              className="error-message"
            >
              {`Choose user `}
            </span>
          ) : ''}
        </div>
      </div>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  addTask: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    taskIndex: PropTypes.number,
    id: PropTypes.string,
    title: PropTypes.string,
    userId: PropTypes.number,
  })).isRequired,
};
