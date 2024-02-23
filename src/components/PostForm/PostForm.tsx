import React, { useState } from 'react';
import { Todo } from '../../Types/Todo';
import usersFromServer from '../../api/users';

type Props = {
  onAdd: (post: Todo) => void;
};

export const PostForm: React.FC<Props> = ({ onAdd }) => {
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasPatternError, setHasPatternError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
    setHasPatternError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();

    if (!title.trim()) {
      setTitle('');
      setHasTitleError(true);
      setHasUserError(!userId);

      return;
    }

    const sanitizedT = title.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    if (!sanitizedT) {
      setHasPatternError(true);
      setTitle('');

      return;
    }

    setHasUserError(!userId);

    if (!userId) {
      return;
    }

    onAdd({
      id: 0,
      title: sanitizedT,
      completed: false,
      userId,
    });

    setUserId(0);
    setTitle('');
    setHasTitleError(false);
    setHasUserError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <label className="label" htmlFor="post-title">Title</label>
      <div className="field">
        <input
          id="post-title"
          type="text"
          data-cy="titleInput"
          placeholder="Add some text"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}

        {!hasTitleError && hasPatternError && (
          <span className="error">Please enter only letters and digits</span>
        )}

      </div>

      <label className="label" htmlFor="post-user">User</label>
      <div className="field">
        <select
          data-cy="userSelect"
          id="post-user"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
