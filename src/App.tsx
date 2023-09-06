import React, { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getMaxId, getUserById, getValidTitle } from './utils/utils';

const initialTodos: Todo[] = todosFromServer.map((todo) => {
  const user = usersFromServer.find(({ id }) => id === todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title && !userId) {
      setHasUserIdError(true);
      setHasTitleError(true);

      return;
    }

    if (!title) {
      setHasTitleError(true);

      return;
    }

    if (!userId) {
      setHasUserIdError(true);

      return;
    }

    const newTodo: Todo = {
      id: getMaxId(todos) + 1,
      title: getValidTitle(title),
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos((prevTodo: Todo[]) => ([...prevTodo, newTodo]));
    setUserId(0);
    setTitle('');
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
          <label htmlFor="title">Title:&nbsp;</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-id">User:&nbsp;</label>

          <select
            id="user-id"
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
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
