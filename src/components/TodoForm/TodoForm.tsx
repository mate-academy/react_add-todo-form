import React, { useState } from 'react';
// import cn from "classnames";
import usersFromServer from '../../api/users';
import { UsersToDos } from '../../types/ToDo';
import { getUserById } from '../../services/user';
// import { event } from 'cypress/types/jquery';

type Props = {
  onSubmit: (todo: UsersToDos) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(userId === 0);

    if (!title || userId === 0) {
      return;
    }

    onSubmit({
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
      <div className="field">
        <input
          type="text"
          value={title}
          data-cy="titleInput"
          onChange={handleTitleChange}
        />

        {hasTitleError && (
          <span className="error">
            Please enter a title
          </span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
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
            <option
              value={user.id}
              key={user.id}

            >
              {user.name}
            </option>
          ))}
        </select>
        {hasUserIdError && (
          <span className="error">
            Please choose a user
          </span>
        )}

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
