import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  userName: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    taskName: '',
    userId: 0,
    userError: false,
    taskError: false,
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSelectUser = (event) => {
    this.setState({
      userId: +event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { taskName, userId } = this.state;

    this.setState({
      errorUser: false,
      errorTask: false,
    });

    if (!taskName) {
      this.setState({ errorTask: true });

      return;
    }

    if (+userId === 0) {
      this.setState({ errorUser: true });

      return;
    }

    this.setState((state) => {
      const newTask = {
        id: state.todos.length + 1,
        title: taskName,
        completed: false,
        userName: users.find(user => user.id === userId).name,
      };

      return ({
        todos: [newTask, ...state.todos],
        taskName: '',
        userId: 0,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Task list</h1>
        <form
          className="form"
          action="/api/todos"
          method="POST"
          onSubmit={this.handleSubmit}
        >
          <div className="form__field">
            <label htmlFor="new-task-name" className="form__title">
              New task
            </label>
            <input
              className="form__control"
              type="text"
              name="taskName"
              value={this.state.taskName}
              onChange={this.handleOnChange}
              id="new-task-name"
              placeholder="New task"
            />

            { this.state.errorTask
            && (
              <div className="alert alert-warning">
                Please enter the task!
              </div>
            )}
          </div>
          <div className="form__group">
            <select
              name="selectUser"
              className="form__control form__control--select"
              id="selectUser"
              value={this.state.userId}
              onChange={this.handleSelectUser}
            >
              <option value="0">Select a user</option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            { this.state.errorUser
            && <div className="alert alert-warning">Please choose a user!</div>}
          </div>
          <button type="submit" className="buttom">
            Add a new task
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
