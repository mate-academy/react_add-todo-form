import React from 'react';
import usersFromServer from '../../api/users';

type Props = {
  handleSubmit: (event: React.FormEvent) => void;
  title: string;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasTitleError: boolean;
  userId: number;
  handleUserIdChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  hasUserIdError: boolean;
};

export const Todo: React.FC<Props> = ({
  handleSubmit,
  title,
  handleTitleChange,
  hasTitleError,
  userId,
  handleUserIdChange,
  hasUserIdError,
}) => {
  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="todo-title">Title:&nbsp;</label>

        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user-select">User:&nbsp;</label>
        <select
          id="user-select"
          data-cy="userSelect"
          value={userId}
          required
          onChange={handleUserIdChange}
        >
          <option value="" disabled={userId !== 0}>
            Choose a user
          </option>

          {usersFromServer.map(user => (
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
