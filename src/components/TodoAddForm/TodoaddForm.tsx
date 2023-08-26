import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';

type Props = {
  onAdd: (todo: Todo) => void;
  currentLength: number,
};

export const TodoAddForm: React.FC<Props> = ({ onAdd, currentLength }) => {
  const [title, setTitle] = useState('');
  const [currentUser, setCurrentUser] = useState('0');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleInput = (value: string) => {
    setTitle(value);
    setHasTitleError(false);
  };

  const handleUserSelect = (value: string) => {
    setCurrentUser(value);
    setHasUserError(false);
  };

  const resetForm = () => {
    setTitle('');
    setCurrentUser('0');
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() && currentUser === '0') {
      setHasTitleError(true);
      setHasUserError(true);

      return;
    }

    if (!title.trim()) {
      setHasTitleError(true);

      return;
    }

    if (currentUser === '0') {
      setHasUserError(true);

      return;
    }

    const newTodo: Todo = {
      id: currentLength + 1,
      title: title.trim(),
      completed: false,
      userId: +currentUser,
    };

    onAdd(newTodo);
    resetForm();
  };

  return (
    <form
      action="/api/users"
      method="POST"
      onSubmit={handleOnSubmit}
    >
      <div className="field">
        <label>
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => handleTitleInput(event.target.value)}
          />
        </label>
        {hasTitleError && (
          <span className="error">
            Please enter a title
          </span>
        )}
      </div>

      <div className="field">
        <label>
          User:
          <select
            data-cy="userSelect"
            value={currentUser}
            onChange={(event) => handleUserSelect(event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>
        </label>
        {hasUserError && (
          <span className="error">
            Please choose a user
          </span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
