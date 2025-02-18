import React, { useState } from 'react';
import { Todo, User } from '../../types';
import { createNewId, getUserById, removeInvalidCharacters } from '../../utils';

type Props = {
  todos: Todo[];
  users: User[];
  handleAdd: (todo: Todo) => void;
};

export const NewTodoForm: React.FC<Props> = ({ todos, users, handleAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleInputError, setHasTitleInputError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserSelectError, setHasUserSelectError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title) {
      setHasTitleInputError(true);
    }

    if (!userId) {
      setHasUserSelectError(true);
    }

    if (title && userId) {
      setTitle('');
      setUserId(0);
      handleAdd({
        id: createNewId(todos),
        title: removeInvalidCharacters(title),
        completed: false,
        userId,
        user: getUserById(users, userId),
      });
    }
  }

  function handleTitleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setHasTitleInputError(false);
  }

  function handleUserSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(Number(event.target.value));
    setHasUserSelectError(false);
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          {`Title: `}
          <input
            type="text"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleInputChange}
            data-cy="titleInput"
          />
        </label>
        {hasTitleInputError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label>
          {`User: `}
          <select
            name="user"
            required
            value={userId}
            onChange={handleUserSelect}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
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
