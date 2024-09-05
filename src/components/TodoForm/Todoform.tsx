import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [count, setCount] = useState(0);

  const [userId, setUserId] = useState(0);
  const [hasUserIdErrorMessage, setHasUserIdErrorMessage] = useState('');

  const [title, setTitle] = useState('');
  const [hasTitleErrorMessage, setHasTitleErrorMessage] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (hasTitleErrorMessage) {
      setHasTitleErrorMessage('');
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    if (hasUserIdErrorMessage) {
      setHasUserIdErrorMessage('');
    }
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleErrorMessage('');
    setHasUserIdErrorMessage('');
    setCount(count + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title) {
      setHasTitleErrorMessage('Please enter a title');
      hasError = true;
    }

    if (!userId) {
      setHasUserIdErrorMessage('Please choose a user');
      hasError = true;
    }

    if (hasError) {
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
    <>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setHasTitleErrorMessage(' ')}
          />
          {hasTitleErrorMessage && (
            <span className="error">{hasTitleErrorMessage}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            required
            value={userId}
            onChange={handleUserChange}
            data-cy="userSelect"
            onBlur={() => setHasUserIdErrorMessage(' ')}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdErrorMessage && (
            <span className="error">{hasUserIdErrorMessage}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
