import React, { ChangeEvent, FormEvent, useState } from 'react';
import { getUserById } from '../../services/users';
import usersFromServer from '../../api/users';
import { Todo } from '../types/Todo';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserError(!userId);

    if (!userId || !title.trim()) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    resetForm();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          placeholder="Enter a title"
          id="title"
          onChange={handleTitleChange}
          value={title}
          type="text"
          data-cy="titleInput"
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          id="user"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0">Choose a user</option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
