import React, { useState } from 'react';
import { Todo } from '../../types';
import { getUsers } from '../../services/apiService';
import './NewTodo.scss';

type Props = {
  onAdd: (newTodo: Omit<Todo, 'id'>) => void,
};

export const NewTodo: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserSelectError, setHasUserSelectError] = useState(false);

  const users = getUsers();

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const forbidden = /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ\d ]/g;
    const newValue = event.target.value.replaceAll(forbidden, '');

    setTitle(newValue);

    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleUserSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(+event.target.value);

    if (hasUserSelectError) {
      setHasUserSelectError(false);
    }
  };

  const handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const newTitle = title.trim();

    if (!newTitle || !userId) {
      setHasTitleError(!newTitle);
      setHasUserSelectError(!userId);

      return;
    }

    const newTodo: Omit<Todo, 'id'> = {
      title: newTitle,
      completed: false,
      userId,
    };

    onAdd(newTodo);
    reset();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      action="/api/todos"
      method="POST"
    >
      <div className="field">
        <label>
          {'Title: '}

          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
        </label>

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label>
          {'User: '}

          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserSelectChange}
          >
            <option value="0" disabled>Choose a user</option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {hasUserSelectError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
