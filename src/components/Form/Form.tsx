import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';

type Props = {
  addTodo: (todo: Todo) => void;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

export const Form: React.FC<Props> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [hasTitleSpaceError, setHasTitleSpaceError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleSpaceError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const errorInTitle = title.trim() === '';

    setHasTitleSpaceError(errorInTitle);
    setHasUserIdError(!userId);

    if (!userId || errorInTitle) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    addTodo(newTodo);
    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title:
        </label>
        <input
          placeholder="Enter a title"
          id="todo-title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleSpaceError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="todo-select">User:</label>
        <select
          id="todo-select"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
