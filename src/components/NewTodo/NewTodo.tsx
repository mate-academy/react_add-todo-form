import React, { useState } from 'react';

import './NewTodo.scss';
import users from '../../api/users';
import { Todo } from '../../types/Todo';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    const formattedTitle = (
      trimmedTitle.replace(/[^А-ЩЬЮЯҐЄІЇа-щьюяґєіїA-Za-z0-9 ]/g, '')
    );

    setHasTitleError(!formattedTitle);
    setHasUserIdError(!userId);

    if (!formattedTitle || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title: formattedTitle,
      completed: false,
      userId,
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label className="label" htmlFor="todo-title">Title: </label>

        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && (
          <span className="error"> Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="todo-user-id">User: </label>

        <select
          id="todo-user-id"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>

          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="error"> Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
