import React, { Component } from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './componets/TodoList';

const todosCopy = [...todos];

export class App extends Component {
  state = {
    title: '',
    userId: '',
    preparedTodos: todosCopy.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
    inputError: '',
    selectError: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      inputError: '',
      selectError: '',
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, userId } = this.state;

    if (!title || title.trim().length === 0) {
      this.setState({ inputError: 'Please enter the title' });

      return;
    }

    if (!userId) {
      this.setState({ selectError: 'Please choose a user' });

      return;
    }

    const todo = {
      userId: +this.state.userId,
      id: this.state.preparedTodos.length + 1,
      title: this.state.title,
      completed: false,
      user: users.find(user => user.id === +this.state.userId),
    };

    this.setState(state => ({
      title: '',
      userId: '',
      preparedTodos: [...state.preparedTodos, todo],
    }));
  }

  render() {
    const {
      title,
      userId,
      preparedTodos,
      inputError,
      selectError,
    } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              {'Введите название дела: '}
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={this.handleChange}
              />
            </label>
            <span>{inputError}</span>
          </div>

          <div>
            <label>
              {'Выберите пользователя: '}
              <select
                name="userId"
                value={userId}
                onChange={this.handleChange}
              >
                <option value="">Choose a user</option>
                {users.map(user => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            <span>{selectError}</span>
          </div>

          <button type="submit">Add</button>
        </form>

        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}
