import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodo = todosFromServer;

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(preparedTodo);

  const getNewTodoId = (allTodos: Todo[]) => {
    const maxId = Math.max(
      ...allTodos.map(currentTodo => currentTodo.id),
    );

    return maxId + 1;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
      .replace(/[^A-Za-z0-9\u0400-\u04FF\s]/g, '');

    setTitle(newTitle);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    setTodos(currentTodos => [...currentTodos, {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId,
    }]);

    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  return (
    <div className="App">
      <h1 className="title Todo__title">Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        className="box Todo__form"
      >
        <div className="field">
          <label className="label">
            Title:
            <br />
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              className="input"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError && (
            <span className="error label">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-id" className="label">
            User:
          </label>
          <select
            id="user-id"
            data-cy="userSelect"
            className="select"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error label">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-primary"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />

    </div>
  );
};
