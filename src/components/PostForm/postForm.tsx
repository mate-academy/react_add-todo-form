import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services.ts/user';
import { Todos } from '../../types/TodosProps';

type Props = {
  onAdd: (post: Todos) => void;
};

export const PostForm: React.FC<Props> = ({ onAdd }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUserId, setErrorUserId] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorTitle(!title.trim());
    setErrorUserId(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setErrorUserId(false);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleAdd}
    >
      <div className="field">

        <label>
          Title:
          {' '}
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {' '}
          {errorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </label>
      </div>

      <div className="field">
        <label>
          User:
          {' '}
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
            key={userId}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {' '}
          {errorUserId && (
            <span className="error">Please choose a user</span>
          )}
        </label>
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
