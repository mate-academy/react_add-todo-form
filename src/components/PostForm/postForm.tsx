import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services.ts/user';
import { Todos } from '../../types/TodosProps';

type Props = {
  onAdd: (post: Todos[]) => void;
};

export const PostForm: React.FC<Props> = ({ onAdd }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  // const [count, setCount] = useState(0);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorMessage(false);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(!title);
    setErrorMessage(!userId);

    if (!title || userId) {
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
    setCount(curr => curr + 1);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(+event.target.value);
    setErrorMessage(false);
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
          {errorMessage && (
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
            {usersFromServer.map((user, i) => (
              <option
                value={i + 1}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {' '}
          {errorMessage && (
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
