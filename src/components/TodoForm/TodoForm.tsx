import React, { useState } from 'react';

import usersFromServer from '../../api/users';
import { getUserById } from '../../services/UserService';
import { Todo } from '../../types/Todo';

interface Props {
  addTodo: (todo: Todo) => void
  largestId: number
}

export const TodoForm: React.FC<Props> = ({ addTodo, largestId }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, SetUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    SetUserId(+event.target.value);
    setHasUserError(false);
  };

  const resetForm = () => {
    setTitle('');
    SetUserId(0);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    addTodo({
      id: largestId + 1,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    resetForm();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={onSubmit}
    >
      <div className="field">
        <label htmlFor="title">
          Title:
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          data-cy="titleInput"
          placeholder="Enter a title"
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="UserId">
          User:
        </label>
        <select
          id="UserId"
          value={userId}
          data-cy="userSelect"
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>

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
