import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    user: '',
    title: '',
    isCorrectTitle: true,
    isCorrectUserName: true,
  }

  addTodo = () => {
    this.setState(state => ({
      todos: [...state.todos, {
        userId: users.find(user => user.name === state.user).id,
        id: state.todos.length + 1,
        title: state.title,
        completed: false,
        user: users.find(user => user.name === state.user),
      }],
    }));
  }

  hendlerFormChange = (event) => {
    const { user, title } = this.state;

    event.preventDefault();
    this.setState(state => ({
      isCorrectUserName: user,
    }));

    if (title.trim().length < 3) {
      this.setState({
        isCorrectTitle: false,
      });

      return;
    }

    if (!user) {
      return;
    }

    this.addTodo();
    this.setState({
      user: '',
      title: '',
    });
  }

  render() {
    const {
      isCorrectTitle,
      isCorrectUserName,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <form
          className="form"
          onSubmit={this.hendlerFormChange}
        >
          <label
            htmlFor="title"
          >
            Title
          </label>
          <input
            value={this.state.title}
            id="title"
            onChange={(event) => {
              this.setState({
                title: event.target.value,
                isCorrectTitle: true,
              });
            }}
          />
          {!isCorrectTitle && (
            <span className="error">
              please enter a title longer than 3 characters
            </span>
          )}
          <label
            htmlFor="users"
          >
            User
          </label>
          <select
            id="users"
            value={this.state.user}
            onChange={(event) => {
              this.setState({
                user: event.target.value,
                isCorrectUserName: true,
              });
            }}
          >
            <option
              disabled
              value=""
            >
              Select user
            </option>
            {users.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
          {!isCorrectUserName && (
            <span className="error">
              please selected user
            </span>
          )}
          <button
            type="submit"
          >
            add
          </button>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
