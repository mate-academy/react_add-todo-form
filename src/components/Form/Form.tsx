import React, { useState } from 'react';
import { User } from '../../types/types';

type Props = {
  usersServer: User[];
  onAdd: (title: string, userId: number) => void;
};

export const Form: React.FC<Props> = ({ usersServer, onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserID] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd(title, userId);
    setTitle('');
    setUserID(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          placeholder="Enter a title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setHasTitleError(false);
          }}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => {
            setUserID(+event.target.value);
            setHasUserError(false);
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
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
