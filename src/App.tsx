import React from 'react';
import './App.scss';
import classNames from 'classnames';

import users from './api/users';
import todosFromServer from './api/todos';

import { Todo, User } from './types/TodoTypes';
import { TodoList } from './TodoList/TodoList';

function getUserById(userId: number): User | null {
  return users.find(user => user.id === userId) || null;
}

const todosAndUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

type State = {
  todos: Todo[];
  newTitle: string;
  newUserId: number;
  hasNameError: boolean;
  hasTitleError: boolean;
};

export class App extends React.Component<{}, State> {
  state = {
    todos: todosAndUsers,
    hasNameError: false,
    newUserId: 0,
    hasTitleError: false,
    newTitle: '',
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.newTitle || !prevState.newUserId) {
        return {
          ...prevState,
          hasTitleError: !prevState.newTitle,
          hasNameError: !prevState.newUserId,
        };
      }

      const newTodo: Todo = {
        id: todosFromServer.length + 1,
        title: prevState.newTitle,
        userId: prevState.newUserId,
        user: getUserById(prevState.newUserId),
      };

      return {
        hasTitleError: false,
        newTitle: '',
        hasNameError: false,
        newUserId: 0,
        todos: [
          newTodo,
          ...prevState.todos,
        ],
      };
    });
  };

  handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      newTitle: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newUserId: +event.target.value,
      hasNameError: false,
    });
  };

  render() {
    const {
      todos,
      newTitle,
      newUserId,
      hasTitleError,
      hasNameError,
    } = this.state;

    const {
      handleFormSubmit,
      handleTitleChange,
      handleUserIdChange,
    } = this;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          className="App-form"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Task"
            value={newTitle}
            onChange={handleTitleChange}
            className={classNames('App-input', {
              'field-error': hasTitleError,
            })}
          />
          {hasTitleError && (
            <span className="App-error">
              Please enter a title
            </span>
          )}
          <select
            value={newUserId}
            onChange={handleUserIdChange}
            className={classNames('App-select', {
              'field-error': hasNameError,
            })}
          >
            <option>Choose name</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
                className="App-select"
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasNameError && (
            <span className="App-error">
              Please select a name
            </span>
          )}
          <button
            type="submit"
            className="App-button"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}
