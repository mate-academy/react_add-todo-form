import React, { useState } from 'react';

import usersFromServer from '../../api/users';

import { getUserById } from '../../services/user';
import { TodosWithUser } from '../../types/TodosWithUser';

type Props = {
  onSubmit: (todo: TodosWithUser) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const [user, setUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setHasUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!user);

    if (!title || !user) {
      return;
    }

    onSubmit({
      title,
      completed: false,
      id: 0,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label>
          User:
          <select data-cy="userSelect" value={user} onChange={handleUserChange}>
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(users => (
              <option value={users.id} key={users.id}>
                {users.name}
              </option>
            ))}
          </select>
        </label>
        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
