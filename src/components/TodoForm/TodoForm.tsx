import React, { useState } from 'react';
import './TodoForm.scss';

import { User } from '../../types/User';
import { Todo } from '../../types/Todos';
import { getUserById } from '../../servises/GetUserById';

type Props = {
  onAdd: (todo: Todo) => void;
  usersList: User[];
};

export const TodoForm: React.FC<Props> = ({ onAdd, usersList }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const checkTitle = title.trim();

    setHasTitleError(!checkTitle);
    setHasUserError(userId === 0);

    if (!checkTitle || userId === 0) {
      return;
    }

    onAdd({
      id: 1256,
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
      className="form"
      action="/api/todos"
      method="POST"
      onSubmit={submit}
    >
      <div className="field">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Please enter title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User:</label>
        <select
          id="user"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>
          {usersList.map(user => (
            <option value={user.id}>{user.name}</option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
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
