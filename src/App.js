import React from 'react';
import { TodoList } from './components/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const titleCharLimit = 16;

export class App extends React.Component {
  state = {
    todosList: todos,
    nextId: todos.length + 1,
    selectedUser: '',
    taskTitle: '',
    selectedUserError: false,
    taskTitleError: false,
  }

  getUserName = userId => (
    users.find(user => user.id === userId).name
  )

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'taskTitle') {
      if (value.length > titleCharLimit || !value.match(/^[\w\s]*$/)) {
        return;
      }
    }

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  validateInputs = () => {
    const { selectedUser, taskTitle } = this.state;
    const userFail = !selectedUser;
    const titleFail = !taskTitle.trim();

    if (userFail) {
      this.setState({
        selectedUserError: true,
      });
    }

    if (titleFail) {
      this.setState({
        taskTitleError: true,
      });
    }

    return !userFail && !titleFail;
  }

  addTask = (event) => {
    event.preventDefault();

    if (!this.validateInputs()) {
      return;
    }

    this.setState(({ todosList, selectedUser, taskTitle, nextId }) => {
      const newTask = {
        userId: +selectedUser,
        title: taskTitle,
        completed: false,
        id: nextId,
      };

      return ({
        todosList: [...todosList, newTask],
        nextId: nextId + 1,
        selectedUser: '',
        taskTitle: '',
      });
    });
  }

  render() {
    const {
      todosList, taskTitle, selectedUser, selectedUserError, taskTitleError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="header">Add todo form</h1>

        <form
          action="/"
          method="POST"
          className="form"
          onSubmit={this.addTask}
        >
          <label htmlFor="selectedUser">
            Select User:
            <select
              name="selectedUser"
              id="selectedUser"
              value={selectedUser}
              onChange={this.handleChange}
            >
              <option value="">Please, choose a user</option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <span
              className="form__warning"
              hidden={!selectedUserError}
            >
              Please choose a user
            </span>
          </label>

          <br />

          <label htmlFor="taskTitle" className="form__title">
            Task title:
            <input
              type="text"
              name="taskTitle"
              id="taskTitle"
              autoComplete="off"
              value={taskTitle}
              onChange={this.handleChange}
            />

            <span
              className="form__warning"
              hidden={!taskTitleError}
            >
              Please enter the title
            </span>
          </label>

          <br />

          <button type="submit">
            Add task
          </button>
        </form>

        <TodoList
          todos={todosList}
          getUserName={this.getUserName}
        />
      </div>
    );
  }
}
