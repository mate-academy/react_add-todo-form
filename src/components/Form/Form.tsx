import React, { useState } from 'react';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onSubmit: (todo: Todo) => void;
};

export const Form: React.FC<Props> = ({ users, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [user, setUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const reset = () => {
    setTitle('');
    setHasTitleError(false);

    setUser(0);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setHasUserError(!user);
    setHasTitleError(!trimmedTitle);

    if (!user || !trimmedTitle) {
      return;
    }

    onSubmit({
      id: 0,
      title: trimmedTitle,
      completed: false,
      userId: user,
    });

    reset();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTitleError(false);
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g, ''));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHasUserError(false);
    setUser(+event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title..."
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select data-cy="userSelect" value={user} onChange={handleUserChange}>
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(innerUser => (
            <option value={innerUser.id} key={innerUser.id}>
              {innerUser.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
