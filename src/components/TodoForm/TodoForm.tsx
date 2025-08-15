import React, { useState } from 'react';
import { User } from '../../types';

type Props = {
  users: User[];
  onSubmit: (formData: { title: string; userId: number }) => void;
};

export const TodoForm: React.FC<Props> = ({ users, onSubmit }) => {
  // #region state
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);
  // #endregion

  //#region change handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };
  // #endregion

  const reset = () => {
    setTitle('');
    setUserId(0);

    setTitleError(false);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

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
    <form action="api/posts" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title:</label>
        <input
          id="titleInput"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User:</label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0">Choose a user</option>
          {users.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
