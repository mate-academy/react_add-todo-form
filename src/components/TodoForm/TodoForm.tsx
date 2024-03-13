import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { getUserById } from '../../services/getUserById';
import usersFromServer from '../../api/users';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title:
        </label>

        <div className="control">
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            id="todo-title"
            placeholder="Enter a title"
            className={classNames('input', {
              'is-danger': hasTitleError,
            })}
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="todo-userId">
          User:
        </label>

        <div className="control">
          <select
            name="userId"
            data-cy="userSelect"
            id="todo-userId"
            className={classNames('select', {
              'is-danger': hasUserIdError,
            })}
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton" className="button">
        Add
      </button>
    </form>
  );
};
