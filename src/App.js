import React from 'react';
import './App.css';
import { TodoList } from './TodoList';

import users from './api/users';
import todos from './api/todos';

const getUserById = userId => users.find(user => user.id === userId);

const preparedTodos = todos.map(task => (
  {
    ...task,
    user: getUserById(task.userId),
  }));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    taskName: '',
    userId: 0,
    taskNameError: false,
    userIdError: false,
  }

  addTask = (taskName, userId) => {
    const newTask = {
      userId,
      user: getUserById(userId),
      id: Math.random(),
      title: taskName,
      completed: false,
    };

    this.setState(state => ({
      todos: [...state.todos, newTask],
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      taskNameError: !state.taskName,
      userIdError: !state.userId,
    }));

    const { taskName, userId } = this.state;

    if (!taskName) {
      return;
    }

    if (!userId) {
      return;
    }

    this.addTask(taskName, userId);

    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      taskName: '',
      userId: 0,
    });
  }

  render() {
    const {
      taskName,
      userId,
      taskNameError,
      userIdError,
    } = this.state;

    return (
      <div className="App">
        <h1>Todo Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              value={taskName}
              onChange={(event) => {
                this.setState({
                  taskName: event.target.value,
                  taskNameError: false,
                });
              }}
            />
            {taskNameError && (
              <span className="error">Please enter the title</span>
            )}
          </div>

          <div>
            <select
              value={userId}
              onChange={(event) => {
                this.setState({
                  userId: +event.target.value,
                  userIdError: false,
                });
              }}
            >
              <option disabled value="0">Choose a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {userIdError
              && (<span className="error">Please choose a user</span>)
            }
          </div>
          <button type="submit">Add new task</button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
