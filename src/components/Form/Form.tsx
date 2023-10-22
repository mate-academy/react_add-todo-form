import React, { useState } from 'react';
import { Todos } from '../../types/Todos';
import usersFromServer from '../../api/users';
import { getUserById } from '../../functions/user';

type Props = {
  onSubmit: (post: Todos) => void;
};

export const Form: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [titleHasError, setTitleHasError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdHasError, setUserIdHasError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleHasError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdHasError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setTitleHasError(false);
    setUserIdHasError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleHasError(!title);
    setUserIdHasError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      user: getUserById(userId),
      completed: false,
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
        <label htmlFor="title-id">Title: </label>
        <input
          id="title-id"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {titleHasError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user-id">User: </label>
        <select
          id="user-id"
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

        {userIdHasError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
