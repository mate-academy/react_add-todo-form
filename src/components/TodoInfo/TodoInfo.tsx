// import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { getUserById } from '../../services/user';
import usersFromServer from '../../api/users';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({ onSubmit }) => {
  // #region state
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  // #endregion
  // #region handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };
  // #endregion

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
      onReset={reset}
    >

      <label className="field" htmlFor="todo-title">Title:&nbsp;&nbsp;</label>

      <input
        id="todo-title"
        type="text"
        data-cy="titleInput"
        placeholder="Add title here"
        defaultValue={title}
        onChange={handleTitleChange}
        onBlur={() => {
          setHasTitleError(!title);
        }}
      />

      {hasTitleError && (
        <span className="error">Please enter a title</span>
      )}

      <div className="field">
        <label htmlFor="user-id">
          User:&nbsp;&nbsp;

          <select
            data-cy="userSelect"
            required
            defaultValue={userId}
            onChange={handleUserIdChange}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </label>
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
