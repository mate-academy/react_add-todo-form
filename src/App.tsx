import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import { getUserById } from './services/user';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState([...initialTodos]);

  const regexp = /^[a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regexp.test(e.target.value)) {
      setTitle(e.target.value);
      setHasTitleError(false);
    } else {
      setHasTitleError(true);
    }
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const maxId = Math.max(...todos.map(todo => todo.id));

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: maxId + 1,
          title: title,
          completed: false,
          userId: userId,
          user: getUserById(userId),
        },
      ];
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:&#32;
            <input
              data-cy="titleInput"
              placeholder="Enter a title"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError && (
            <span className="error">
              Please enter a title. It should only contain English/Ukrainian
              letters, digits, and spaces.
            </span>
          )}
        </div>

        <div className="field">
          <label>
            User:&#32;
            <select
              value={userId}
              data-cy="userSelect"
              onChange={handleUserIdChange}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
