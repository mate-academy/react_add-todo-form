import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    username: '',
    task: '',
    errorSelect: '',
    errorTask: '',

  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errorTask: '',
      errorSelect: '',
    });
  }

  addTask = () => {
    if (this.state.username === '' || this.state.task === '') {
      if (this.state.username === '') {
        this.setState({ errorSelect: 'Please, select the user' });
      }

      if (this.state.task === '') {
        this.setState({ errorTask: 'Please, enter your task' });
      }

      return;
    }

    const todo = {
      user: users.find(user => (
        user.username.localeCompare(this.state.username) === 0
      )),
      id: this.state.todos.length + 1,
      title: this.state.task,
      completed: false,
      errorSelect: '',
      errorTask: '',
    };

    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
    this.setState({
      username: '',
      task: '',
      errorTask: '',
      errorSelect: '',
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={(event) => {
          event.preventDefault();
        }}
        >
          <div className="errorMessage">{this.state.errorSelect}</div>
          <select
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          >
            <option value="" hidden>
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.username}
              >
                {user.username}
              </option>
            ))}
          </select>

          <div className="errorMessage">{this.state.errorTask}</div>
          <input
            type="text"
            name="task"
            placeholder="Please enter a task"
            value={this.state.task}
            onChange={this.handleChange}
          />

          <button
            type="submit"
            onClick={this.addTask}
          >
            Add
          </button>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
