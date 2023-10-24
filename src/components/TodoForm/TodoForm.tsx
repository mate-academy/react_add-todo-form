import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { UsersToDo } from '../../types/ToDo';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todo: UsersToDo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  // const [hasErrorMessage, setHasErrorMessage] = useState('');

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

    // if (!title) {
    //   setHasErrorMessage('Please choose a user')
    // }

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
        <span>Title: </span>
        <input
          type="text"
          value={title}
          placeholder="Enter your ToDo here"
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
        <span>User: </span>
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
