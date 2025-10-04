import React, { useState } from 'react';
import { User } from './types/User';

type Props = {
  users: User[];
  onSubmit: (data: { title: string; userId: number }) => void;
};

export const PostForm: React.FC<Props> = ({ users, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const validTitle = trimmedTitle !== '';
    const validUser = userId !== '';

    setShowTitleError(!validTitle);
    setShowUserError(!validUser);

    if (!validTitle || !validUser) {
      return;
    }

    onSubmit({
      title: trimmedTitle,
      userId: Number(userId),
    });

    // очищаємо форму після успішного додавання
    setTitle('');
    setUserId('');
    setShowTitleError(false);
    setShowUserError(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          data-cy="titleInput"
          id="title"
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (showTitleError) {
              setShowTitleError(false);
            }
          }}
        />
        {showTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          id="user"
          value={userId}
          onChange={(event) => {
            setUserId(event.target.value);
            if (showUserError) {
              setShowUserError(false);
            }
          }}
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {showUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
