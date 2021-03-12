import React, { Component } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';

import './App.css';

import { users } from './api/users';
import { todos } from './api/todos';

const preparedTodos = todos.map(
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
    renderedTodos: [...preparedTodos],
    hasErrors: {
      title: false,
      user: false,
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      [name]: value,
      hasErrors: {
        ...prevState.hasErrors,
        [name]: false,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, completed, user } = this.state;
    const foundUser = users.find(person => person.name === user);

    if (!title && !user) {
      this.setState(prevState => ({
        hasErrors: {
          title: !prevState.title,
          user: !prevState.user,
        },
      }));

      return;
    }

    if (!title) {
      this.setState(prevState => ({
        hasErrors: {
          title: !prevState.title,
        },
      }));

      return;
    }

    if (!user) {
      this.setState(prevState => ({
        hasErrors: {
          user: !prevState.user,
        },
      }));

      return;
    }

    this.setState((prevState) => {
      const id = prevState.renderedTodos.length + 1;
      const addUser = {
        userId: foundUser.id,
        id,
        title,
        completed,
        user: foundUser,
      };

      return ({
        renderedTodos: [...prevState.renderedTodos, addUser],
        user: '',
        title: '',
      });
    });
  }

  render() {
    const { title, user, renderedTodos, hasErrors } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        {renderedTodos.length
          && (
            <TodoList todos={renderedTodos} />)
        }
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
            'input', { input__warning: hasErrors.title },
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
            'select', { select__error: hasErrors.user },
          )}
          >
            Please choose a user
          </div>
        </form>
      </div>
    );
  }
}
