import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [titleText, setTitleText] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState(todosFromServer);

  const addNewTodo = () => {
    const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: maxId,
      title: titleText,
      userId: userId,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleText(event.target.value);
    setHasTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!titleText.trim());
    setHasUserIdError(!userId);

    if (!titleText.trim() || !userId) {
      return;
    }

    addNewTodo();

    setTitleText('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="userTitle">
            Title:
          </label>

          <input
            type="text"
            aria-label="title"
            id="userTitle"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleText}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="selectedUser">
            User:
          </label>

          <select
            data-cy="userSelect"
            id="selectedUser"
            value={userId}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

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
