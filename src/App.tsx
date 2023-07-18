import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos } from './types/Todos';

function getUserById(userId: number) {
  return usersFromServer.find(user => user?.id === userId) || null;
}

export const todosWithUser: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [errorUserId, setErrorUserId] = useState<boolean>(false);

  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState<boolean>(false);

  const [todos, setTodos] = useState<Todos[]>(todosWithUser);

  const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

  const resetField = () => {
    setUserId(0);
    setTitle('');
    setErrorTitle(false);
    setErrorUserId(false);
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() && !userId) {
      setErrorTitle(true);
      setErrorUserId(true);

      return;
    }

    if (!title.trim()) {
      setErrorTitle(true);

      return;
    }

    if (!userId) {
      setErrorUserId(true);

      return;
    }

    setTodos([
      ...todos,
      {
        id: maxId,
        title,
        userId,
        completed: false,
        user: getUserById(userId),
      },
    ]);

    resetField();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            id="title"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setErrorTitle(false);
            }}
          />
          {errorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userId">User: </label>

          <select
            id="userId"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setErrorUserId(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {
            errorUserId && (
              <span className="error">Please choose a user</span>
            )
          }

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
