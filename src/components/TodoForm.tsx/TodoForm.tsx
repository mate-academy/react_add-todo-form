import React, { useState } from 'react';
import cn from 'classnames';

import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const isValidTitle = /^[a-zA-Zа-яА-Я0-9\s]+$/.test(title);

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasUserIdError(!userId);

    if (!title) {
      setTitleErrorMessage('Please enter a title');
    } else if (!isValidTitle) {
      setTitleErrorMessage(
        'Please enter valid title. Special characters are not allowed',
      );
    }

    if (!isValidTitle || !userId) {
      return;
    }

    onSubmit({
      user: getUserById(userId),
      id: 0,
      title,
      completed: false,
      userId,
    });

    reset();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleErrorMessage('');
  };

  const handUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      className="box"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="todo-title" className="label">
          Title:
        </label>
        <input
          id="todo-title"
          className={cn('input', {
            'is-danger': titleErrorMessage,
          })}
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleChange}
        />

        {titleErrorMessage && (
          <span className="help is-size-6 is-danger">{titleErrorMessage}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="todo-user-id" className="label">
          User:
        </label>
        <div className="control">
          <div
            className={cn('select', {
              'is-danger': hasUserIdError,
            })}
          >
            <select
              id="todo-user-id"
              data-cy="userSelect"
              required
              value={userId}
              onChange={handUserIdChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasUserIdError && (
          <span className="help is-size-6 is-danger">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton" className="button is-light">
        Add
      </button>
    </form>
  );
};
