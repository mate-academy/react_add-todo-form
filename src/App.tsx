import React, { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleNotFound, setTitleNotFound] = useState(false);
  const [userNotSelected, setUserNotSelected] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredTitle = event.target.value.replace(
      /[^a-zA-Zа-яА-Я0-9\s]/g, '',
    );

    setTitleNotFound(!filteredTitle.trim());
    setTitle(filteredTitle);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserNotSelected(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setTitleNotFound(!trimmedTitle);
    setUserNotSelected(!userId);

    if (!trimmedTitle || !userId) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id + 1));

    const newTodo = {
      id: newId,
      title: trimmedTitle,
      completed: false,
      userId,
    };

    setTodos(prevTodo => [...prevTodo, newTodo]);

    reset();
  };

  return (
    <div className="App section box">
      <h1 className="title">Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleOnSubmit}
        className="form"
      >
        <div className="field">
          <label
            htmlFor="title"
            className="title is-5"
          >
            Title:
          </label>
          <input
            className="input is-medium"
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter the title"
            onChange={handleTitle}
            value={title}
          />

          {titleNotFound && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="user"
            className="title is-5"
          >
            User:
          </label>
          <select
            data-cy="userSelect"
            id="user"
            className="select is-info"
            onChange={handleUserSelect}
            value={userId}
          >
            <option value="0" disabled selected>
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userNotSelected && (
            <span className="error">
              Please choose a user
            </span>
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
