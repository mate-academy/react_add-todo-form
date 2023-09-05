import React, { useState } from 'react';
import './NewTodo.scss';

import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/getUserById';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const NewTodo: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userId, setUserId] = useState(0);
  const [userError, setUserIdError] = useState('');

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const hasErrors = !title.trim() || !userId;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError('Please enter a title');
    }

    if (!userId) {
      setUserIdError('Please choose a user');
    }

    if (hasErrors) {
      return;
    }

    onAdd({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError('');
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          name="title"
          id="title"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitle}
          required
        />
        <span className="error">
          {titleError}
        </span>
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUser}
          required
        >
          <option
            value="0"
            disabled
          >
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        <span className="error">
          {userError}
        </span>
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        onClick={handleSubmit}
      >
        Add
      </button>
    </form>
  );
};
