import React from 'react';
import classNames from 'classnames';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoTypes } from './types/TodoTypes';

type State = {
  todos: TodoTypes[],
  name: string,
  title: string,
  hasNameError: boolean,
  hasTitleError: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todos: todosFromServer,
    name: '',
    title: '',
    hasNameError: false,
    hasTitleError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (!prevState.name || !prevState.title) {
        return {
          ...prevState,
          hasNameError: !prevState.name,
          hasTitleError: !prevState.title,
        };
      }

      const maxId = Math.max(...prevState.todos.map(todo => todo.id));
      const currUserIndex = users.findIndex((user) => prevState.name === user.name);

      const newTodo = {
        id: maxId + 1,
        title: prevState.title,
        userId: users[currUserIndex].id,
      };

      return {
        name: '',
        title: '',
        todos: [
          newTodo,
          ...prevState.todos,
        ],
      };
    });
  };

  handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      name: event.target.value,
      hasNameError: false,
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
      name,
      hasNameError,
      hasTitleError,
    } = this.state;

    return (
      <div className="App">
        <div className="App__container">
          <h1>Add todo form</h1>
          <form className="App__form" onSubmit={this.handleFormSubmit}>
            <div>
              <select
                value={name}
                onChange={this.handleNameChange}
                className={classNames('App__select', {
                  'field-error': hasNameError,
                })}
              >
                <option>Choose name</option>
                {users.map(user => {
                  return (
                    <option>
                      {user.name}
                    </option>
                  );
                })}
              </select>
              {hasNameError && (
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
                onChange={this.handleTitleChange}
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
