import React from 'react';
import PropTypes from 'prop-types';

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

    if (currentUserId === 0 || currentTask === '') {
      this.setState({
        taskError: currentTask === '',
        userIdError: currentUserId === 0,
      });
    } else {
      this.props.addTask({
        id: this.props.todosLength + 1,
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
      <div className="newTodo">
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
              className="errorMessage"
            >
              {`Enter task `}
            </span>
          ) : ''}
          {userIdError ? (
            <span
              className="errorMessage"
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
  todosLength: PropTypes.number.isRequired,
};
