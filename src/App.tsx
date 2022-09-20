import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { AppState } from './types/AppState';

import 'bulma/css/bulma.css';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = useState<AppState['newTodos']>(todos);
  const [newTitle, setNewTitle] = useState<AppState['newTitle']>('');
  const [userId, setUserId] = useState<AppState['userId']>('');
  const [titleError, setTitleError] = useState<AppState['titleError']>(false);
  const [userError, setUserError] = useState<AppState['userError']>(false);

  const hundleChange
    = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      if (name === 'title') {
        setNewTitle(value);
        setTitleError(false);
      }

      if (name === 'user') {
        setUserId(+value);
        setUserError(false);
      }
    };

  const newTodoId = () => {
    return Math.max(...newTodos.map(({ id }) => id)) + 1;
  };

  const hundleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: newTodoId(),
      userId: +userId,
      title: newTitle,
      completed: false,
      user: getUser(+userId),
    };

    if (!newTitle.trim()) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (newTitle.trim() && userId) {
      setNewTodos([...newTodos, newTodo]);
      setNewTitle('');
      setUserId('');
    }
  };

  return (
    <div className="App">
      <h1
        className="title has-text-link has-text-centered mt-5"
      >
        Add todo form
      </h1>

      <form
        action="/api/users"
        method="POST"
        className="Form box"
        onSubmit={hundleSubmit}
      >
        <div className="field mb-3">
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            className="input"
            placeholder="Enter a title"
            value={newTitle}
            onChange={hundleChange}
          />
          { titleError
            && (
              <span className="error has-text-danger">
                Please enter a title
              </span>
            )}
        </div>

        <div className="field select">
          <select
            data-cy="userSelect"
            name="user"
            value={userId}
            onChange={hundleChange}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
          { userError
            && (
              <span className="error has-text-danger">
                Please choose a user
              </span>
            )}
        </div>
        <div className="Button mt-5">
          <button
            type="submit"
            data-cy="submitButton"
            className="button is-info"
          >
            Add
          </button>
        </div>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
