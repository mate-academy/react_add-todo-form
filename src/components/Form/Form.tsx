import React, { useState } from 'react';

import { Todo } from '../../Types/Todo';
import { User } from '../../Types/User';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/getUserById';

type Prop = {
  onSubmit: (todo: Todo) => void
};

export const Form: React.FC<Prop> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  const [userId, setUserId] = useState(0);
  const [userIdErrorMessage, setUserIdErrorMessage] = useState('');

  const handleTitleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value);
    setTitleErrorMessage('');
  };

  const handleUserIdChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+ev.target.value);
    setUserIdErrorMessage('');
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleErrorMessage('Please enter a title');
    }

    if (!userId) {
      setUserIdErrorMessage('Please enter a title');
    }

    if (!title.trim() || !userId) {
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
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter your text"
        />
        {titleErrorMessage && (
          <span className="error">{titleErrorMessage}</span>)}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>
          {usersFromServer.map((user: User) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userIdErrorMessage && (
          <span className="error">Please choose a user</span>
        )}

      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
