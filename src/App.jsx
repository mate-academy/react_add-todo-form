import React, { Component } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
// import { AddTodo } from './components/AddTodo';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

console.log([...preparedTodos]);

export class App extends Component {
  state = {
    todos: [...preparedTodos],
    userName: '',
    titleOfTodo: '',
    titleError: false,
    userError: false,
  };

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : value.replace('  ', ' '),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state);

    const { titleOfTodo, userName } = this.state;

    if (!titleOfTodo) {
      this.setState({
        titleError: true,
      });
    }

    if (!userName) {
      this.setState({
        userError: true,
      });
    }

    if (!titleOfTodo || !userName) {
      return;
    }

    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          id: state.todos.length + 1,
          title: state.titleOfTodo,
          user: usersFromServer.find(user => user.name === state.userName),
          completed: false,
        },
      ],
    }));

    this.setState({
      user: '',
      titleOfTodo: '',
    });
  };

  render() {
    // console.log(this.state);

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <span className="item">
          <span>Users: </span>
          {usersFromServer.length}
        </span>

        <form className="form" onSubmit={this.handleSubmit}>
          <span className="item">
            <input
              type="text"
              name="titleOfTodo"
              placeholder="Type new todo"
              value={this.state.titleOfTodo}
              onChange={this.handleChange}
            />
            {this.state.titleError && (
              <span className="form__error">Please enter the message</span>
            )}
          </span>

          <span className="item">
            <select
              name="userName"
              value={this.state.user}
              onChange={this.handleChange}
            >
              <option value="">Choose a user</option>

              {usersFromServer.map((user) => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {this.state.userError && (
              <span className="form__error">Please choose user</span>
            )}
          </span>

          <span className="item">
            <button type="submit" name="newTodo">
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
