import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasSelectError(false);
  };

  const handleSubmit = ((event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasSelectError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      user: getUserById(userId),
      id: 0,
      title,
      userId,
      completed: false,
    });

    reset();
  });

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title">
          Title:&nbsp;
        </label>

        <input
          type="text"
          data-cy="titleInput"
          id="title"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="select">
          User:&nbsp;
        </label>

        <select
          id="select"
          data-cy="userSelect"
          value={userId}
          onChange={handleSelectChange}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasSelectError && (
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
