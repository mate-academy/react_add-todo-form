import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function findUser(userId: number): User | null {
  const userToReturn = usersFromServer.find(user => user.id === userId);

  return userToReturn || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasValidId, setHasValidId] = useState(false);
  const [hasValidTitle, setHasValidTitle] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setHasValidTitle(!value);
  };

  const handleUserSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
    setHasValidId(!value);
  };

  const reset = () => {
    setUserId(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasValidId(!userId);
    setHasValidTitle(!title);

    const idList = todos.map(todo => todo.id);
    const biggest = Math.max(...idList) + 1;

    if (userId > 0 && title.length > 0) {
      todos.push({
        id: biggest,
        title,
        completed: false,
        userId,
        user: findUser(userId),
      });

      reset();
    }
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
              onChange={handleTitle}
            />
          </label>

          {hasValidTitle
            && <span className="error">Please enter a title</span>}
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

          {hasValidId && <span className="error">Please choose a user</span>}
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
