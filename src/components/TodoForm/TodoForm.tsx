import React, { useState } from 'react';
import './TodoForm.scss';

import { usersForSelect } from '../services/usersForSelect';

import { Todo } from '../types/todo';
import { getUserById } from '../services/userById';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.replace(/[^a-zA-Za-яА-Я0-9\s]/g, '');

    setTitle(newTitle);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserError(!userId);

    if (!title.trim() || userId === 0) {
      return;
    }

    onAdd({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
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
        <label
          className="label"
          htmlFor="todo-title"
        >
          <span className="title-label">
            Title:
          </span>
        </label>

        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && (
          <span className="error">
            Please enter a title
          </span>
        )}
      </div>

      <div className="field">
        <label
          className="label"
          htmlFor="todo-user"
        >
          <span className="user-label">
            User:
          </span>
        </label>
        <select
          data-cy="userSelect"
          id="todo-user"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersForSelect}
        </select>

        {hasUserError && (
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
