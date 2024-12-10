import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { TodoWithUser } from '../../types/todo';
import { getUserById } from '../../servises/userService';

type Props = {
  onSubmit: (todo: TodoWithUser) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      title,
      userId,
      completed: false,
      id: 0,
      user: getUserById(userId),
    });

    resetForm();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleChange}
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select data-cy="userSelect" value={userId} onChange={handleUserChange}>
          <option value={0}>Choose a user</option>

          {usersFromServer.map(user => {
            const { id, name } = user;

            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
