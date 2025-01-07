import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';
import { Todos } from '../../types/Todos';

type Props = {
  onSubmit: (todo: Todos) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  // #region state
  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  // #endregion state

  // #region change handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleErrorMessage('');
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };
  // #endregion change handlers

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasUserIdError(!userId);

    if (!title) {
      setTitleErrorMessage('Please enter a title');
    } else if (/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/.test(title)) {
      setTitleErrorMessage(
        'Title can only contain letters, digits, and spaces',
      );
    }

    if (!title || !userId || /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/.test(title)) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form onSubmit={handleSubmit} action="/api/todos" method="POST">
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Add Title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleErrorMessage && (
          <span className="error">{titleErrorMessage}</span>
        )}
      </div>

      <div className="field">
        <select
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
