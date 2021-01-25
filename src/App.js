import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';

import users from './api/users';
import todosFromApi from './api/todos';

function getUserById(userId) {
  return users.find(user => user.id === userId);
}

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export class App extends React.Component {
  state = {
    todos: preparedTodos,
    taskTitle: '',
    userId: 0,
    errorUser: false,
    errorTitle: false,
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    const correctValue = name === 'userId' ? +value : value;

    this.setState({ [name]: correctValue });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { userId, taskTitle } = this.state;

    this.setState({
      errorUser: false,
      errorTitle: false,
    });

    if (userId === 0) {
      this.setState({ errorUser: true });

      return;
    }

    if (taskTitle.trim().length < 1) {
      this.setState({ errorTitle: true });

      return;
    }

    this.setState((state) => {
      const newTask = {
        id: state.todos.length + 1,
        title: taskTitle,
        completed: false,
        user: getUserById(userId),
      };

      return ({
        todos: [newTask, ...state.todos],
        users: state.users,
        taskTitle: '',
        userId: 0,
      });
    });
  }

  render() {
    const { todos,
      taskTitle,
      userId,
      errorUser,
      errorTitle } = this.state;

    return (
      <div className="app">
        <h1>TODO</h1>

        <form
          action="/api/goods"
          method="POST"
          className="input-group"
          onSubmit={this.handleSubmit}
        >
          <div className="input">

            <input
              type="text"
              name="taskTitle"
              className="form-control"
              placeholder="Your task..."
              value={taskTitle}
              onChange={this.handleChange}
            />

            <select
              name="userId"
              className="form-control"
              value={userId}
              onChange={this.handleChange}
            >
              <option value="0">Choose a user</option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <div className="btn">
              <button type="submit" className="btn">
                Add a new task
              </button>
            </div>

          </div>
        </form>

        { errorUser
        && <div className="alert">Choose a user!</div>}
        { errorTitle
        && <div className="alert">Enter the title!</div>}

        <TodoList todos={todos} />
      </div>
    );
  }
}
