import React, { useState } from 'react';
import usersFromService from '../../api/users';
import { Todo } from '../types/Todo';

interface Props {
  onAdd: (todo: Todo) => void;
}

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const heandleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const heandleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const heandleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title,
      userId,
      completed: false,
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={heandleAdd}
      onReset={reset}
    >
      <div className="field">
        <label htmlFor="title-id">Title: </label>

        <input
          id="title-id"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={heandleTitleChange}
          placeholder="Enter a title"
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user-id">User: </label>

        <select
          id="user-id"
          data-cy="userSelect"
          value={userId}
          required
          onChange={heandleUserIdChange}
        >
          <option value="0">Choose a user</option>

          {usersFromService.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
