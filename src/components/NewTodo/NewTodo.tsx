import { User } from '../../types';
import React, { useState } from 'react';

interface Props {
  users: User[];
  onAdd: (title: string, userId: number) => void;
}

export const NewTodo: React.FC<Props> = ({ users, onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const isFormValid = () => {
    return title.trim() !== '' && userId !== 0;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredTitle = event.target.value.replace(
      /[^a-zA-Zа-яА-Я0-9 ]/g,
      '',
    );

    setTitle(filteredTitle);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!isFormValid()) {
      return;
    }

    onAdd(title.trim(), userId);

    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        {'Title: '}
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        {'User: '}
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
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

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
