import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/userById';
import { TODO } from '../../types/todo';

interface Props {
  onAdd: (todo: TODO) => void;
}

export const NewTodo: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTitleError(false);
    setTitle(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHasUserIdError(false);
    setUserId(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId) || null,
    });

    reset();
  };

  return (
    <form action="../../api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <div className="control">
          <label className="label" htmlFor="titleInput">
            Title:
          </label>
          <input
            id="titleInput"
            className="input"
            type="text"
            placeholder="Text input"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        {hasTitleError && (
          <p className="help is-danger error">Please enter a title</p>
        )}
      </div>

      <div className="field">
        <div className="control">
          <label className="label" htmlFor="userSelect">
            User:
          </label>

          <div className="select">
            <select
              id="userSelect"
              value={userId}
              data-cy="userSelect"
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
          </div>
        </div>
        {hasUserIdError && (
          <p className="help is-danger error">Please choose a user</p>
        )}
      </div>

      <div className="control">
        <button
          className="button is-link "
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </div>
    </form>
  );
};
