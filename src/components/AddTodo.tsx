import { Todo } from '../types/Todo';
import usersFromServer from '../api/users';

import { getUserById } from '../servises/user';
import React, { useState } from 'react';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const AddTodo: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState('');

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError('');
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setHasTitleError('Please enter a title');
    }

    if (userId === 0) {
      setHasUserIdError('Please choose a user');
    }

    if (!title.trim() || userId === 0) {
      return;
    }

    onAdd({
      id: 0,
      title,
      user: getUserById(userId),
      completed: false,
    });

    setTitle('');
    setUserId(0);
    setHasTitleError('');
    setHasUserIdError('');
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title:
        </label>
        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">{hasTitleError}</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="todo-user">
          User:
        </label>
        <select
          id="todo-user"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0">Choose a user</option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {hasUserIdError.length > 0 && (
          <span className="error">{hasUserIdError}</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
