import React, { useState } from 'react';
import usersFromServer from '../api/users';
import { getUserById } from '../services/user';
import { Todo } from '../types/Todo';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError('');
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError('Please enter a title');
    }

    if (!userId) {
      setHasUserError('Please choose a user');
    }

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <label className="field" htmlFor="todoTitle">
        Title:&nbsp;&nbsp;

        <input
          id="todoTitle"
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />
      </label>

      <span className="error">{hasTitleError}</span>

      <div className="field">
        <label htmlFor="todoUser">User: </label>

        <select
          data-cy="userSelect"
          id="todoUser"
          required
          value={userId}
          onChange={handleUserIdChange}
        >
          <option
            value="0"
            disabled
          >
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>

          ))}
        </select>

        <span className="error">{hasUserError}</span>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
