import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todos } from './components/Types/Todo';
import { getUserById } from './components/utils/getUserById';
import { generalNewId } from './components/utils/generateNewld';
import { TodoList } from './components/TodoList';
import './App.scss';

const initialTodos: Todos = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleIdError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState(initialTodos);

  function handleReset() {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    setTodos((prevTodos) => [...prevTodos, {
      id: generalNewId(todosFromServer),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    }]);

    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >

        <label htmlFor="titleInput">Title:</label>

        <input
          type="text"
          id="titleInput"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleIdError
        && <span className="error">Please enter a title</span>}

        <div>
          <label htmlFor="UserSelect">User:</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
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
