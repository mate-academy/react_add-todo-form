import React, { Component } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';

import './App.css';

import { users } from './api/users';
import { todos } from './api/todos';

const preTodos = todos.map(
  todo => ({
    ...todo,
    user: users.find(user => user.id === todo.id),
  }),
);

export class App extends Component {
  state = {
    title: '',
    completed: false,
    user: '',
    preparedTodos: preTodos,
    isWarning: false,
    isError: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      isWarning: false,
      isError: false,
    });

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, completed, user } = this.state;
    const foundUser = users.find(person => person.name === user);

    if (title === '') {
      this.setState({ isWarning: true });

      return;
    }

    if (user === '') {
      this.setState({ isError: true });

      return;
    }

    this.setState((prevState) => {
      const id = prevState
        .preparedTodos[prevState.preparedTodos.length - 1].id + 1;

      return ({
        preparedTodos: [...prevState.preparedTodos,
          {
            userId: foundUser.id,
            id,
            title,
            completed,
            user: foundUser,
          },
        ],
        user: '',
        title: '',
      });
    });
  }

  render() {
    const { title, user, preparedTodos } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodoList todos={preparedTodos} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <form
          method="post"
          onSubmit={handleSubmit}
          className="App__form"
        >
          <button
            type="submit"
            className="App__button"
          >
            Add
          </button>
          <label htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="App__input"
            value={title}
            onChange={handleChange}
            placeholder="title"
          />
          <div className={classNames(
            'input', { input__warning: this.state.isWarning },
          )}
          >
            Please enter the title
          </div>
          <select
            className="App__select"
            value={user}
            name="user"
            onChange={handleChange}
          >
            <option
              className="App__option App__option--accent"
              value=""
            >
              Please choose a user
            </option>
            {users.map(human => (
              <option
                key={human.id}
                value={human.name}
                className="App__option"
              >
                {human.name}
              </option>
            ))}
          </select>
          <div className={classNames(
            'select', { select__error: this.state.isError },
          )}
          >
            Please choose a user
          </div>
        </form>
      </div>
    );
  }
}
