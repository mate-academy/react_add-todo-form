import React, { useState } from 'react';
import cn from 'classnames';

import usersFromServer from '../../api/users';

import { TodoWithUser } from '../../types/TodoWithUser';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todoEl: TodoWithUser) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChenge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChenge = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title
      .split(' ')
      .filter(word => word)
      .join(' ');

    setTitle(trimmedTitle);

    setHasTitleError(trimmedTitle.length === 0);
    setHasUserIdError(!userId);

    if (!userId || !title) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: true,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      className="box"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label className="label" htmlFor="title">
          {'Title: '}
        </label>

        <div className={cn('control', { 'has-icons-right': hasTitleError })}>
          <input
            className={cn('input', { 'is-danger': hasTitleError })}
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChenge}
          />

          {hasTitleError && (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle has-text-danger" />
            </span>
          )}
        </div>

        {hasTitleError && (
          <p className="help is-danger">Please enter a title</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="user-id">
          {'User: '}
        </label>

        <div className="control has-icons-left">
          <div className={cn('select', { 'is-danger': hasUserIdError })}>
            <select
              id="user-id"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChenge}
              required
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

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>

        {hasUserIdError && (
          <p className="help is-danger">Please choose a user</p>
        )}
      </div>

      <div className="buttons">
        <button
          className="button is-link"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </div>
    </form>
  );
};
