// components/NewTodo/NewTodo.tsx
import React, { useState } from 'react';
import { User } from '../../types/User';

type Props = {
  onAdd: (title: string, userId: number) => void;
  users: User[];
};

export const NewTodo: React.FC<Props> = ({ onAdd, users }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    if (userId === 0) {
      setUserError('Please choose a user');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    onAdd(title.trim(), userId);

    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserError('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredTitle = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '');

    setTitle(filteredTitle);
    setTitleError('');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          data-cy="titleInput"
          onChange={handleTitleChange}
          placeholder="Enter todo title"
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User</label>
        <select
          id="user"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
          required
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
        {userError && <span className="error">{userError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
