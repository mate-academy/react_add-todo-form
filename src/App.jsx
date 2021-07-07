import React, { Component } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export class App extends Component {
  state = {
    todos: [...preparedTodos],
    userName: '',
    titleOfTodo: '',
    titleError: false,
    userError: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.replace(/\s{2,}/g, ' '),
      titleError: false,
      userError: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { titleOfTodo, userName } = this.state;

    if (!titleOfTodo || !userName) {
      this.setState({
        titleError: !titleOfTodo,
        userError: !userName,
      });

      return;
    }

    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          id: new Date(),
          title: state.titleOfTodo,
          user: usersFromServer.find(user => user.name === state.userName),
          completed: false,
        },
      ],
    }));

    this.setState({
      userName: '',
      titleOfTodo: '',
    });
  };

  render() {
    const { titleError, userError } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <span className="item">
          <span>Users: </span>
          {usersFromServer.length}
        </span>

        <form className="form" onSubmit={this.handleSubmit}>
          <span className="item">
            {titleError && (
              <span className="form__error">Please enter the message</span>
            )}
            <input
              type="text"
              name="titleOfTodo"
              placeholder="Type new todo"
              value={this.state.titleOfTodo}
              onChange={this.handleChange}
            />
          </span>

          <span className="item">
            {userError && (
              <span className="form__error">Please choose user</span>
            )}
            <select
              name="userName"
              value={this.state.userName}
              onChange={this.handleChange}
            >
              <option value="">Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </span>

          <span className="item">
            <button type="submit" className="button">
              Add new todo
            </button>
          </span>
        </form>

        <h3>List of todos</h3>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}
