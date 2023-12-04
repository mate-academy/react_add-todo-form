import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../shared/lib';
import usersFromServer from '../../api/users';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleErrors, setHasTitleErrors] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdErrors, setHasUserIdErrors] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleErrors(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdErrors(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleErrors(!title.trim());
    setHasUserIdErrors(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInputChange}
          />
        </label>

        {hasTitleErrors && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label>
          {'User: '}
          <select
            data-cy="userSelect"
            onChange={handleUserIdChange}
            value={userId}
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
        </label>

        {hasUserIdErrors && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
