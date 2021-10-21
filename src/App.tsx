import React from 'react';
import './App.css';

import classnames from 'classnames';
import users from './api/users';
import todos from './api/todos';

interface Todo {
  userId?: number,
  id: number,
  title: string,
  completed?: boolean,
  name: string | null,
}

interface State {
  todos: Todo[],
  newTitle: string,
  userName: string,

  hasNameError: boolean;
  hasFieldError: boolean;
}

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  name: users.find(user => user.id === todo.userId)?.name || null,
}));

export class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    newTitle: '',
    userName: '',
    hasNameError: false,
    hasFieldError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { userName, newTitle } = this.state;

    this.setState(state => ({
      hasNameError: state.userName === '',
      hasFieldError: state.newTitle === '',
    }));

    if (!userName) {
      this.setState({
        hasNameError: true,
      });
    }

    if (!newTitle) {
      this.setState({
        hasFieldError: true,
      });
    }

    if (newTitle && userName) {
      const newTodo: Todo = {
        name: userName,
        title: newTitle,
        id: todos.length + 1,
      };

      this.setState(state => ({
        todos: [...state.todos, newTodo],
        newTitle: '',
        userName: '',
      }));
    }
  };

  render() {
    const {
      newTitle,
      userName,
      hasFieldError,
      hasNameError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          onSubmit={this.handleFormSubmit}
          className="todo__form"
        >

          <input
            className={classnames({
              'field-error': hasFieldError,
            })}
            type="text"
            value={newTitle}
            onChange={(event) => {
              this.setState({
                newTitle: event.currentTarget.value,
                hasFieldError: false,
              });
            }}
          />
          {hasFieldError && (
            <span className="error">
              <br />
              Please enter the title
            </span>
          )}

          <select
            className={classnames({
              'field-error': hasNameError,
            })}
            name="user"
            value={userName}
            onChange={event => {
              this.setState({
                userName: event.currentTarget.value,
                hasNameError: false,
              });
            }}
          >
            <option value="">Choose a user</option>
            {
              users.map(user => (
                <option
                  key={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>
          {hasNameError && (
            <span className="error">
              <br />
              Please choose a user
            </span>
          )}
          <button type="submit">
            Add
          </button>
        </form>
        <ul className="todo-list">
          {
            this.state.todos.map(todo => (
              <li
                className="todo-item"
                key={todo.id}
              >
                {todo.name}
                <br />
                {todo.title}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
