import React, { useState } from 'react';

import usersFromServer from '../../api/users';

import classNames from 'classnames';
import { Todos } from '../../components/typses/Todo';
import { getUserById } from '../../servis/userServ';

type Props = {
  onSubmit: (todos: Todos) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const hendlTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.toString());
    setHasTitleError(false);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title.trim());
    setUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      title,
      userId,
      id: 0,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title
        </label>
        <div className="control">
          <input
            id="todo-title"
            className={classNames('input', {
              'is-danger': hasTitleError,
            })}
            placeholder="Enter a title"
            value={title}
            data-cy="titleInput"
            onChange={hendlTitle}
          />
        </div>
        {hasTitleError && (
          <p className="help is-danger">Please enter a title</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="todo-user">
          User
        </label>
        <div className="control">
          <div
            className={classNames('select', {
              'is-danger': userIdError,
            })}
          >
            <select
              data-cy="userSelect"
              id="todo-user"
              required
              value={userId}
              onChange={handleUserId}
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
        {userIdError && (
          <span className="help is-danger error">Please choose a user</span>
        )}
      </div>

      <div className="control">
        <button type="submit" data-cy="submitButton" className="button is-link">
          Add
        </button>
      </div>
    </form>
  );
};
