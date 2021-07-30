/* eslint-disable no-alert */
import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(
  todo => ({
    ...todo,
    user: users.find(human => human.id === todo.userId),
  }),
);

class App extends Component {
  state = {
    initialTodos: preparedTodos,
    id: todos.length + 1,
    userId: '',
    title: '',
    completed: false,
  }

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  // eslint-disable-next-line consistent-return
  onSubmit = (event) => {
    event.preventDefault();
    const { id, userId, title, completed } = this.state;

    if (!title) {
      return alert('Please enter a title');
    }

    if (!userId) {
      return alert('Please choose a user');
    }

    const newTodo = {
      id,
      userId,
      title,
      completed,
      user: users.find(person => person.id === Number(userId)),
    };

    this.setState(state => ({
      initialTodos: [...state.initialTodos, newTodo],
    }));
  }

  render() {
    const { initialTodos, userId, title } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="title"
            onChange={this.onChange}
            placeholder="title"
            value={title}
          />
          <select
            onChange={this.onChange}
            name="userId"
            value={userId}
          >
            <option>
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
        <TodoList todos={initialTodos} />
      </div>
    );
  }
}

export default App;
