import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const visibleTodos = [...preparedTodos];

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isValidtitle, setIsValidTitle] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId === 0 || title === '') {
      setIsValidTitle(title === '');
      setIsValidUser(userId === 0);

      return;
    }

    const maxId = Math.max(...visibleTodos.map(todo => todo.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    visibleTodos.push(newTodo);

    setTitle('');
    setUserId(0);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsValidTitle(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsValidUser(false);
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
            <span className="inputTitle">
              Title:
            </span>
            <input
              data-cy="titleInput"
              placeholder="Enter a title"
              type="text"
              value={title}
              onChange={handleTitle}
            />
          </label>
          {isValidtitle && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>
        <div className="field">
          <label>
            <span className="inputTitle">
              User:
            </span>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUser}
            >
              <option
                disabled
                value="0"
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
          </label>
          {isValidUser && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>
        <button
          data-cy="submitButton"
          type="submit"
        >
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
