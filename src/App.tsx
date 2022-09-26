import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [falseTitle, setFalseTitle] = useState(false);
  const [falseUserId, setFalseUserId] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId === 0 || title === ' ') {
      setFalseTitle(title === '');
      setFalseUserId(userId === 0);

      return;
    }

    if (!title.trim()) {
      setFalseTitle(true);

      return;
    }

    const todo: Todo = {
      id: Math.max(...todos.map(({ id }) => id)) + 1,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    todos.push(todo);

    setTitle('');
    setUserId(0);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setFalseTitle(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setFalseUserId(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title"> Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {falseTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user"> User: </label>
          <select
            id="user"
            name="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUser}
          >
            <option value="0" disabled>
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
          {falseUserId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
