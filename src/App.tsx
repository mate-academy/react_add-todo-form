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
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
            <br />

            <input
              id="title"
              type="type"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {hasTitleError && (
            <span className="error">Pleace enter a title</span>
          )}

        </div>

        <div className="field">
          <label htmlFor="user-id">
            User:
            <br />

            <select
              id="user-id"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(currentUser => (
                <option value={currentUser.id} key={currentUser.id}>
                  {currentUser.name}
                </option>
              ))}

            </select>

            {hasUserIdError && (
              <span className="error">Please choose a user</span>
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
