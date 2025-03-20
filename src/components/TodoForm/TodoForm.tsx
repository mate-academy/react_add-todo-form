import { useState } from 'react';
import { Todos } from '../../types/Todos';
import { User } from '../../types/User';
import React from 'react';

type Props = {
  onSubmit: (title: string, userId: number) => void;
  users: User[];
  todos: Todos[];
};

export const TodoForm: React.FC<Props> = ({ onSubmit, users }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setHasTitleError(true);
    }

    if (userId === 0) {
      setHasUserIdError(true);
    }

    if (!title.trim() || userId === 0) {
      return;
    }

    onSubmit(title, userId);

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSumbit}>
      <div className="field">
        <label htmlFor="todos-id">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          id="todos-id"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user-id">User: </label>
        <select
          data-cy="userSelect"
          id="user-id"
          required
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
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
