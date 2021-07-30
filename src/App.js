import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.Component {
  state = {
    preparedTodos: todosWithUsers,
    createdTitle: '',
    userId: 0,
    isTitleValid: false,
    isUserValid: false,
  }

  addTodo = (todo) => {
    this.setState(state => ({
      preparedTodos: [...state.preparedTodos, todo],
    }));
  };

  handleInput = (event) => {
    this.setState({ createdTitle: event.target.value });
  }

  handleSelect = (event) => {
    this.setState({ userId: Number(event.target.value) });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      preparedTodos,
      createdTitle,
      userId,
    } = this.state;

    this.setState({
      isTitleValid: !createdTitle,
      isUserValid: !userId,
    });

    if (!createdTitle || !userId) {
      return;
    }

    const todo = {
      id: preparedTodos.length + 1,
      userId,
      title: createdTitle,
      completed: false,
      user: users.find(user => user.id === userId),
    };

    this.addTodo(todo);
    this.setState({
      createdTitle: '',
      userId: 0,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <TodoList todos={this.state.preparedTodos} />
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="text"
              placeholder="Title"
              value={this.state.createdTitle}
              onChange={this.handleInput}
            />
            {this.state.isTitleValid
              && <span className="error"> Please enter the title.</span>}
          </p>
          <p>
            <select
              required
              value={this.state.userId}
              onChange={this.handleSelect}
            >
              <option value="0">Choose a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {this.state.isUserValid
              && <span className="error"> Please choose a user.</span>}
          </p>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
