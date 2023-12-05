import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { getMaxId, getUser, preparedTodoList } from './helpers';
import { Todo } from './types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodoList);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserID] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserID(+event.target.value);
    setHasUserIdError(false);
  };

  const resetForm = () => {
    setTitle('');
    setHasTitleError(false);

    setUserID(0);
    setHasUserIdError(false);
  };

  const hasAllFields = title.trim() && userId;

  const handleChange = (event: React.FormEvent) => {
    event.preventDefault();

    setHasUserIdError(!userId);
    setHasTitleError(!title);

    if (!hasAllFields) {
      return;
    }

    const newTodo: Todo = {
      id: getMaxId(todos),
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    setTodos(currentTodos => (
      [...currentTodos, newTodo]
    ));

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitle}
            required
          />
          {hasTitleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            defaultValue={0}
            onChange={handleSelect}
            required
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({
              id,
              name,
            }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>

          {hasUserIdError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleChange}
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
