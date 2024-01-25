import React, { useState } from 'react';

import { Users } from '../../types/User';
import { Todo, Todos } from '../../types/Todo';
import { getUserById } from '../../services/getUserById';
import { generateNewId } from '../../services/generateNewId';

interface Props {
  users: Users
  onSubmit: (todo: Todo) => void
  todosArr: Todos
}

export const TodoForm: React.FC<Props> = ({
  users,
  onSubmit,
  todosArr,
}) => {
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

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title.trim() || !userId) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    onSubmit({
      title,
      userId,
      completed: false,
      user: getUserById(userId, users),
      id: generateNewId(todosArr),
    });

    resetForm();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          id="titleInput"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}

        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}

      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          data-cy="userSelect"
          id="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && (
          <span className="error">Please choose a user</span>
        )}

      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
