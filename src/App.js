import React, { Component } from 'react';
import './App.css';

import todosFromServer from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

class App extends Component {
  state = {
    todos: todosFromServer,
    userId: 0,
    title: '',
    errorMessage: '',
  }

  addTodo = () => {
    const { todos, userId, title } = this.state;

    if (!title) {
      this.setState({ errorMessage: 'Please enter the title' });

      return;
    }

    if (userId === 0) {
      this.setState({ errorMessage: 'Please choose a user' });

      return;
    }

    this.setState({
      todos: [
        ...todos,
        {
          userId,
          id: todos.length + 1,
          title,
          completed: false,
        },
      ],
      userId: 0,
      title: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errorMessage: '',
    });
  }

  render() {
    const { todos, errorMessage } = this.state;

    return (
      <div className="App">
        <h1>List of todos</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.addTodo();
          }}
          className="form"
        >
          <select
            name="userId"
            value={this.state.userId}
            onChange={this.handleChange}
          >
            <option value={0}>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
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
            Add ToDo
          </button>
        </form>

        <p className="App__error">
          {errorMessage}
        </p>

        <TodoList todos={todos} />

      </div>
    );
  }
}

export default App;
