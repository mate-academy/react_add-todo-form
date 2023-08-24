/* eslint-disable @typescript-eslint/quotes */
import React, { FormEventHandler, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, User } from './types/index';
import { TodoList } from './components/TodoList/TodoList';

export function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [updatedTodos, setUpdatedTodos] = useState(todos);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (title && userId) {
      const newTodo = {
        id: Math.max(...updatedTodos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: Number(userId),
        user: getUser(Number(userId)),
      };

      setUpdatedTodos([...updatedTodos, newTodo]);
      setFormSubmitted(false);
      setTitle('');
      setUserId(0);
    } else {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" onSubmit={handleSubmit} method="POST">

        <div className="field">
          <label htmlFor="title">
            {/* Title: */}
            {`Title: `}
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              data-cy="titleInput"
            />
          </label>

          {(!title && formSubmitted) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
            {`User: `}
            <select
              data-cy="userSelect"
              id="user"
              name="user"
              value={String(userId)}
              onChange={(event) => setUserId(Number(event.target.value))}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option
                  value={id}
                  key={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>

          {(!userId && formSubmitted) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={updatedTodos}
      />
    </div>
  );
};
