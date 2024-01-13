import React, { useState } from 'react';
import { getUserById } from '../../services/userFind';
import { Todo } from '../../types/todo';
import usersFromServer from '../../api/users';

type Props = {
  addPost: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedTitle = event.target.value
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(sanitizedTitle);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  function validate() {
    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }
  }

  const clear = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    validate();

    if (!title || !userId) {
      return;
    }

    addPost({
      id: 0,
      title,
      completed: false,
      userId: 0,
      user: getUserById(+userId),
    });

    clear();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title-input">Title:</label>
        <input
          data-cy="titleInput"
          id="title-input"
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && (
          <span className="error"> Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user-select">User:</label>
        <select
          data-cy="userSelect"
          id="user-select"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0">Choose a user</option>

          {usersFromServer.map((user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          )))}
        </select>

        {hasUserIdError && (
          <span className="error"> Please choose a user</span>
        )}
      </div>

      <button
        data-cy="submitButton"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
