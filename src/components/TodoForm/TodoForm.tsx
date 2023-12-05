import React, { useState } from 'react';
import { Todo } from '../Types/Todo';
import { User } from '../Types/User';

type Prors = {
  onSubmit: (todo: Todo) => void,
  users: User[],
};

export const TodoForm: React.FC<Prors> = ({ onSubmit, users }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    resetForm();

    onSubmit({
      title,
      completed: false,
      userId,
    });
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <label className="field">

        {'Title: '}
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
      </label>

      <div className="field">
        <label htmlFor="user-id">User: </label>

        <select
          id="user-id"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
          required
        >
          <option value="0" disabled>Choose a user</option>

          {users.map(({ id, name }) => (
            <option
              key={id}
              value={id}
            >
              {name}
            </option>
          ))}
        </select>

        {hasUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
