import React, { useState } from 'react';
import users from '../api/users';
import classNames from 'classnames';
type Props = {
  onSubmit: (data: { title: string; userId: number }) => void;
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
      title,
      userId,
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
      <label className="field" htmlFor="todo-title">
        Title:&nbsp;
      </label>
      <input
        id="todo-title"
        className={classNames('input', {
          error: hasTitleError,
        })}
        type="text"
        data-cy="titleInput"
        placeholder="Enter a title"
        value={title}
        onChange={handleTitleChange}
        onBlur={() => {
          setHasTitleError(!title);
        }}
      />
      {hasTitleError && <span className="error">Please enter a title</span>}

      <div className="field">
        <label htmlFor="user-id">User: </label>
        <select
          data-cy="userSelect"
          required
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
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
