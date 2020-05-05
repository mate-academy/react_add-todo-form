import React from 'react';
import todos from '../../api/todos';
import users from '../../api/users';
import TaskList from '../TaskList/TaskList';
import './NewTodo.css';

function getUserById(userId) {
  return users.find(user => user.id === userId);
}

export const preparedTasks = todos.map(task => ({
  ...task,
  user: getUserById(task.userId),
}));

class NewTodo extends React.Component {
state = {
  tasks: preparedTasks,
  newTaskTitle: '',
  selectedUserId: 0,
  hasTitleError: false,
  hasUserError: false,
};

handleTitleChange = (event) => {
  this.setState({
    hasTitleError: false,
    newTaskTitle: event.target.value,
  });
};

handleUserChange = (event) => {
  this.setState({
    hasUserError: false,
    selectedUserId: +event.target.value,
  });
};

handleFormSubmit = (event) => {
  event.preventDefault();

  const { newTaskTitle, selectedUserId } = this.state;

  if (!newTaskTitle || !selectedUserId) {
    this.setState({
      hasTitleError: !newTaskTitle,
      hasUserError: !selectedUserId,
    });

    return;
  }

  if (newTaskTitle !== '') {
    this.setState({
      hasTitleError: false,

    });

    return;
  }

  this.setState((state) => {
    const newTask = {
      id: +new Date(),
      title: state.newTaskTitle,
      userId: state.selectedUserId,
      user: getUserById(state.selectedUserId),
    };

    return {
      tasks: [...state.tasks, newTask],
      newTaskTitle: '',
      selectedUserId: 0,
    };
  });
};

render() {
  const {
    tasks,
    newTaskTitle,
    selectedUserId,
    hasTitleError,
    hasUserError,
  } = this.state;

  return (
    <>
      <form onSubmit={this.handleFormSubmit}>
        <label htmlFor="task">
          Enter task:
          {' '}
        </label>
        <textarea
          id="task"
          rows="5"
          cols="45"
          placeholder="For example: Go to jogging"
          value={newTaskTitle}
          onChange={this.handleTitleChange}
        />

        {hasTitleError && (
          <>
            <br />
            <span className="error">Please enter a title</span>
          </>
        )}
        <br />
        <label>
          <select
            value={selectedUserId}
            onChange={this.handleUserChange}
          >
            <option value="0" hidden>Please select a user</option>

            {users.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        {hasUserError && (

          <span className="error">Please select a user</span>

        )}
        <br />
        <button type="submit">
          Add
        </button>
      </form>

      <TaskList tasks={tasks} />
    </>
  );
}
}

export default NewTodo;
