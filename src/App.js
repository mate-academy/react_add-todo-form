import React from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import todosFromServer from './api/todos';
import users from './api/users';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    title: '',
    username: '',
    inputErrorIsVisible: false,
    selectErrorIsVisible: false,
  };

  addTodo = () => {
    if (!this.state.title.trim() && !this.state.username) {
      this.setState({
        inputErrorIsVisible: true,
        selectErrorIsVisible: true,
      });

      return;
    }

    if (!this.state.title.trim()) {
      this.setState({
        inputErrorIsVisible: true,
      });

      return;
    }

    if (!this.state.username) {
      this.setState({
        selectErrorIsVisible: true,
      });

      return;
    }

    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          userId: users.find(user => state.username === user.name).id,
          id: state.todos.length + 1,
          title: state.title,
          completed: false,
          user: users.find(user => state.username === user.name),
        },
      ],
    }));

    this.setState({
      title: '',
      username: '',
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>

        <form
          className="form App__form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label htmlFor="title" className="form__label">
            Title

            <input
              type="text"
              name="title"
              id="title"
              className="form__input"
              placeholder="Title"
              value={this.state.title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                  inputErrorIsVisible: false,
                });
              }}
            />
          </label>

          {this.state.inputErrorIsVisible && (
            <p className="form__message-title">Please enter the title</p>
          )}

          <select
            name="username"
            className="form__select"
            value={this.state.username}
            onChange={(event) => {
              this.setState({
                username: event.target.value,
                selectErrorIsVisible: false,
              });
            }}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {this.state.selectErrorIsVisible && (
            <p className="form__message-user">Please choose a user</p>
          )}

          <button
            type="submit"
            className="form__button"
            onClick={this.addTodo}
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
