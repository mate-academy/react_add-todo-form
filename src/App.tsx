import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser, User } from './types';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const initTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [todos, setTodos] = useState(initTodos);

  function resetForm() {
    setUserId(0);
    setTitle('');
  }

  function handleAddTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    const todosIds = todos.map(({ id }) => id);
    const maxTodosId = Math.max(...todosIds);
    const newTodo = {
      id: maxTodosId + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos((prevState) => [...prevState, newTodo]);
    resetForm();
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHasTitleError(false);
    setTitle(event.target.value);
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setHasUserIdError(false);
    setUserId(+event.target.value);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <label htmlFor="TitleLabel">Title: </label>
          <input
            type="text"
            id="TitleLabel"
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
          <label htmlFor="UserLabel">User: </label>
          <select
            data-cy="userSelect"
            id="UserLabel"
            value={userId}
            onChange={handleUserChange}
          >
            <option
              value={0}
              disabled
              selected
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
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

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
