import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUser } from '../../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserIdError(false);
  };

  const handleReset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      user: getUser(userId),
    });

    handleReset();
  };

  return (
    <form
      action="./api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        data-cy="titleInput"
        placeholder="Enter a title"
        onChange={handleTitleChange}
      />

      {hasTitleError && <span className="error">Please enter a title</span>}

      <br />

      <label htmlFor="users">User: </label>
      <select
        name="users"
        id="users"
        value={userId}
        data-cy="userSelect"
        onChange={handleUserIdChange}
      >
        <option value="0" disabled>Choose a user</option>
        {usersFromServer.map(user => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {hasUserIdError && <span className="error">Please choose a user</span>}

      <br />

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
