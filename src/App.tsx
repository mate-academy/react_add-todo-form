import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { TodoWithUser } from './types/TodoWithUser';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const getTodoId = (todos: TodoWithUser[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

const todos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [availableTodos, setAvailableTodos] = useState(todos);

  const clearState = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitle = (value: string) => {
    setErrorTitle(false);
    setTitle(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimedTitle = title.trim();

    setErrorUser(!userId);
    setErrorTitle(!trimedTitle);

    if (!trimedTitle || !userId) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: getTodoId(availableTodos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setAvailableTodos(currentTodos => [...currentTodos, newTodo]);

    clearState();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        method="POST"
        onSubmit={handleSubmit}
      >

        <div className="field">
          <label>
            <span>Title: </span>

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => (
                handleTitle(event.target.value)
              )}
            />
          </label>
          {errorTitle
            && (
              <span className="error">
                Please enter a title
              </span>
            )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setErrorUser(false);
              setUserId(+event.target.value);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={availableTodos} />
    </div>
  );
};
