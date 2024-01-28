import React, { useState } from 'react';
import { findUser } from '../../api';
import Users from '../../api/users';
import { PreparedTodo } from '../../types';

type Props = {
  onAdd:(todo:PreparedTodo) => void;
};

export const Form:React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleAdd = (event:React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title || !title.trim());
    setHasUserIdError(!userId);

    if (!title || !title.trim() || !userId) {
      return;
    }

    const reset = () => {
      setTitle('');
      setHasTitleError(false);

      setUserId(0);
      setHasUserIdError(false);
    };

    onAdd({
      id: 0,
      title,
      completed: false,
      userId,
      user: findUser(userId),
    });
    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleAdd}
    >
      <div className="field">
        <label htmlFor="post-title">
          Title:&nbsp;

          <input
            id="post-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

        </label>
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}

      </div>

      <div className="field">
        <label htmlFor="user-id">
          User:&nbsp;

          <select
            id="user-id"
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserIdChange}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {Users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
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
