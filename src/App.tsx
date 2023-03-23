import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserIdValid, setIsUserIdValid] = useState(true);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsTitleValid(Boolean(title));
    setIsUserIdValid(Boolean(userId));

    if (title && userId) {
      window.console.log('Data valid!');
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleValid(true);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsUserIdValid(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="todoTitle">
            {'Title: '}
            <input
              type="text"
              name="title"
              id="todoTitle"
              placeholder="Ener a title"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {!isTitleValid && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todoUser">
            {'User: '}
            <select
              id="todoUser"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {!isUserIdValid && (
              <span className="error">
                Please choose a user
              </span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
