/* eslint-disable consistent-return */
import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [title, setTitle] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(false);

  const resetForm = () => {
    setUserId(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsUserIdValid(!userId);
    setIsTitleValid(!title);

    const getTodoId = todos.map(todo => todo.id);
    const maxId = Math.max(...getTodoId) + 1;

    if (userId && title) {
      todos.push({
        id: maxId,
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      });

      resetForm();
    }
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;

    setTitle(currentValue);
    setIsTitleValid(!currentValue);
  };

  const handleUserSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = +event.target.value;

    setUserId(currentValue);
    setIsUserIdValid(!currentValue);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitleInput}
            />
          </label>

          {isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserSelection}
            >
              <option value="0" disabled>Choose a user</option>
              {
                usersFromServer.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))
              }
            </select>
          </label>

          {isUserIdValid && <span className="error">Please choose a user</span>}
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
