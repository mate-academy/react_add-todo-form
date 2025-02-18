import React from 'react';

import usersFromServer from '../../api/users';

interface TodoFormProps {
  title: string;
  userId: number;
  errorTitle: string;
  errorUserId: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUserChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onTitleChange,
  onSubmit,
  errorUserId,
  onUserChange,
  title,
  errorTitle,
  userId,
}) => {
  return (
    <form action="/api/todos" method="POST" onSubmit={onSubmit}>
      <div className="field">
        <label className="label" htmlFor={'title'}>
          Title:
        </label>
        <input
          placeholder="Enter a title"
          type="text"
          id="title"
          data-cy="titleInput"
          value={title}
          onChange={onTitleChange}
        />
        {errorTitle && <span className="error">{errorTitle}</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor={'user'}>
          User:
        </label>
        <select
          data-cy="userSelect"
          required
          id="user"
          value={userId}
          onChange={onUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {errorUserId && <span className="error">{errorUserId}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
