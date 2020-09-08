/* eslint-disable no-alert */
import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    title: '',
    username: '',
    titleError: false,
    userError: false,
    error: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, username } = this.state;

    if (!title.trim() && !username) {
      this.setState({
        error: true,
      });

      return;
    }

    if (!title.trim()) {
      this.setState({
        titleError: true,
      });

      return;
    }

    if (!username) {
      this.setState({
        userError: true,
      });

      return;
    }

    this.setState(state => ({
      todos: [
        {
          userId: users.find(user => state.username === user.name).id,
          id: state.todos.length + 1,
          title: state.title,
          completed: false,
          user: users.find(user => state.username === user.name),
        },
        ...state.todos,
      ],
    }));

    this.setState({
      title: '',
      username: '',
    });
  };

  render() {
    const {
      username,
      userError,
      title,
      titleError,
      error,
    } = this.state;

    return (
      <div className="App">
        <form className="form">
          <select
            className="form__item"
            name="username"
            value={username}
            onChange={this.handleChange}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
            alert('Choose a user!')
          )}

          <input
            className="form__item"
            type="text"
            name="title"
            placeholder="Add todo"
            value={title}
            onChange={this.handleChange}
          />

          {titleError && (
            alert('Enter a title!'))
          }

          <button
            className="form__item form__button"
            type="submit"
            onClick={this.handleSubmit}
          >
            Add
          </button>

          {error && (
            alert('Choose a user and enter a title!')
          )}
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
