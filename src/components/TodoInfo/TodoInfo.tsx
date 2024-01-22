import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/todo';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({ onSubmit }) => {
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
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim()) {
      setTitle('');

      return;
    }

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
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <span>Title: </span>

        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <span>User: </span>

        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
