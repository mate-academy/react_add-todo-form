import React, { Component } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todosFromApi from './api/todos';

const preparedTodos = todosFromApi.map(item => ({
  ...item,
  user: users.find(user => user.id === item.userId),
}));

export class App extends Component {
  state = {
    todos: preparedTodos,
    title: '',
    username: '',
    error: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { todos, username, title } = this.state;

    if (!title) {
      this.setState({ error: 'Please enter the title' });

      return;
    }

    if (!username) {
      this.setState({ error: 'Please choose a user' });

      return;
    }

    this.setState(state => ({
      todos: [
        {
          id: todos.length + 1,
          title,
          completed: false,
          user: users.find(user => state.username === user.name),
        },
        ...state.todos,
      ],
    }));

    this.setState({
      title: '',
      username: '',
      error: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      error: '',
    });
  }

  render() {
    const { todos, username, error } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <p>
          <span>Todos: </span>
          {todos.length}
        </p>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <form
          onSubmit={this.handleSubmit}
          className="form"
        >
          <select
            name="username"
            value={username}
            onChange={(event) => {
              this.setState({
                username: event.target.value,
              });
            }}
          >
            <option value={0}>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={this.state.title.trimLeft()}
            onChange={this.handleChange}
            name="title"
            className="form__input"
            placeholder="Type here"
          />

          <button type="submit">
            Add Todo
          </button>
        </form>

        {error && (
          <p className="form__error">
            {error}
          </p>
        )}

        <TodoList todos={todos} />

      </div>
    );
  }
}
