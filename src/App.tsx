import React from 'react';
import classNames from 'classnames';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoTypes } from './types/TodoTypes';

type State = {
  todos: TodoTypes[],
  id: number,
  title: string,
  hasIdError: boolean,
  hasTitleError: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todos: todosFromServer,
    id: 0,
    title: '',
    hasIdError: false,
    hasTitleError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (!prevState.id || !prevState.title) {
        return {
          ...prevState,
          hasIdError: !prevState.id,
          hasTitleError: !prevState.title,
        };
      }

      const maxId = Math.max(...prevState.todos.map(todo => todo.id));

      const newTodo = {
        id: maxId + 1,
        title: prevState.title,
        userId: prevState.id,
      };

      return {
        id: 0,
        title: '',
        todos: [
          newTodo,
          ...prevState.todos,
        ],
      };
    });
  };

  handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      id: +event.target.value,
      hasIdError: false,
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      hasTitleError: false,
    });
  };

  render() {
    const {
      todos,
      title,
      id,
      hasIdError,
      hasTitleError,
    } = this.state;

    const {
      handleFormSubmit,
      handleUserIdChange,
      handleTitleChange,
    } = this;

    return (
      <div className="App">
        <div className="App__container">
          <h1>Add todo form</h1>
          <form className="App__form" onSubmit={handleFormSubmit}>
            <div>
              <select
                value={id}
                onChange={handleUserIdChange}
                className={classNames('App__select', {
                  'field-error': hasIdError,
                })}
              >
                <option> Choose name </option>
                {users.map(user => {
                  return (
                    <option
                      value={user.id}
                      key={user.id}
                    >
                      {user.name}
                    </option>
                  );
                })}
              </select>
              {hasIdError && (
                <span className="error">
                  Please select a name
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="..."
                value={title}
                onChange={handleTitleChange}
                className={classNames('App__input', {
                  'field-error': hasTitleError,
                })}
              />
              {hasTitleError && (
                <span className="error">
                  Please enter a title
                </span>
              )}
            </div>
            <button
              type="submit"
              className="App__button"
            >
              Add
            </button>
          </form>
          <p>
            <TodoList todos={todos} />
          </p>
        </div>
      </div>
    );
  }
}

export default App;
