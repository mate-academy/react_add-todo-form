import './App.scss';
import React, { useState } from 'react';

import { Todos } from './types/Todos';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(id: number) {
  return usersFromServer.find((user) => user.id === id) || null;
}

const todosWithUsers: Todos[] = todosFromServer.map((todo) => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

function getMaxId(todos: Todos[]): number {
  return Math.max(...todos.map((todo) => todo.id)) + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+(event.target.value));
    setHasUserError(false);
  };

  const clearAll = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId && title.trim()) {
      const newTodo = {
        id: getMaxId(todos),
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      clearAll();
    }

    if (!userId) {
      setHasUserError(true);
    }

    if (!title) {
      setHasTitleError(true);
    }
  };

  return (
    <div className="App">
      <form
        className="decor"
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="form-left-decoration" />
        <div className="form-right-decoration" />
        <div className="circle" />
        <div className="form-inner">
          <h1>Add todo form</h1>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}

          <select
            id="title"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map((user) => {
              const { id, name } = user;

              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}

          <button type="submit" data-cy="submitButton">
            Add
          </button>
        </div>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
