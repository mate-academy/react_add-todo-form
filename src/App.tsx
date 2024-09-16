import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './components/Types/interfaces';
import { getUserById } from './services/user';
import { getDefaultTodos } from './services/defaultTodos';
import { getNewTodoId } from './services/newTodoId';

export const App = () => {
  const [todos, setTodos] = useState(getDefaultTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const addNewTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    addNewTodo({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
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

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>

        <TodoList todos={todos} />
      </form>
    </div>
  );
};
