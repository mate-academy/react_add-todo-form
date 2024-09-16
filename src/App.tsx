import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTitleError(!event.target.value.trim());
    setTitle(event.target.value);
  };

  const handleUserChoose = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setHasTitleError(!trimmedTitle);
    setHasUserError(!userId);

    if (!trimmedTitle || !userId) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodos = {
      id: maxId,
      title: trimmedTitle,
      completed: false,
      userId,
    };

    setTodos(prevTodos => [...prevTodos, newTodos]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            className="input"
            type="text"
            data-cy="titleInput"
            onChange={handleTitle}
            id="title"
            placeholder="Enter a title"
            value={title}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <label htmlFor="title">User: </label>
        <select
          id="user"
          data-cy="userSelect"
          onChange={handleUserChoose}
          value={userId}
          className="select is-info"
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <div className="field">
          {hasUserError && <span className="error">Please choose a user</span>}
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
