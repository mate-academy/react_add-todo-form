import React, { useState } from 'react';

import type { User } from './../../types/User';

type Props = {
  onAdd: (title: string, userId: number) => void;
  users: User[];
};

export const TodoForm: React.FC<Props> = ({ onAdd, users }) => {
  const [title, setTitle] = useState('');
  const [hasErrorTitle, setHasErrorTitle] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasErrorUserId, setHasErrorUserId] = useState(false);

  const handleTitleChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const input = changeEvent.target.value;

    if (!input && !title) {
      return;
    }

    const regex = /[^a-z\d\s\u0400-\u04FF]/gi;

    const newInput = input.replace(regex, '');

    setTitle(newInput);
    setHasErrorTitle(false);
  };

  const handleUserChange = (
    changeEvent: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setUserId(+changeEvent.target.value);
    setHasErrorUserId(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);

    setHasErrorTitle(false);
    setHasErrorUserId(false);
  };

  const handleSubmit = (
    submitEvent: React.FormEvent<HTMLFormElement>,
  ): void => {
    submitEvent.preventDefault();
    setHasErrorTitle(!title);
    setHasErrorUserId(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd(title, userId);

    resetForm();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title-form">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          id="title-form"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleChange}
        />

        {hasErrorTitle && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user-form">User: </label>
        <select
          data-cy="userSelect"
          id="user-form"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>

        {hasErrorUserId && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
