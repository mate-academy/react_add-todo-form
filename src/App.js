import React from 'react';
import { TodoList } from './components/TodoList';

import todos from './api/todos';
import users from './api/users';

import './App.css';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    user: '',
    title: '',
    isCorrectTitle: false,
    isCorrectUserName: false,
  }

  addTodo = () => {
    this.setState(state => ({
      todos: [...state.todos, {
        userId: users.find(user => user.id === state.id),
        id: state.todos.length + 1,
        title: state.title,
        completed: false,
        user: users.find(user => user.name === state.user),
      }],
    }));
  }

  hendlerChange = (event) => {
    const { user, title } = this.state;

    event.preventDefault();
    this.setState(state => ({
      isCorrectUserName: !user,
    }));

    if (title.length < 3) {
      this.setState({
        isCorrectTitle: true,
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
      <div>
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form
          className="form"
          onSubmit={this.hendlerChange}
        >
          <label>
            Title
            <input
              value={this.state.title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                  isCorrectTitle: false,
                });
              }}
            />

            {isCorrectTitle && (
              <span>
                {` Title should contain more than 3 letters`}
              </span>
            )}
          </label>

          <label>
            User
            <select
              id="users"
              value={this.state.user}
              onChange={(event) => {
                this.setState({
                  user: event.target.value,
                  isCorrectUserName: false,
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

            {isCorrectUserName && (
            <span>
              {` You should choose a user`}
            </span>
            )}
          </label>

          <button
            className="button"
            type="submit"
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
