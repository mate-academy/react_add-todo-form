import React, { useState } from 'react';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onSubmit: (data: { title: string; userId: number }) => void;
};
export const TodoForm: React.FC<Props> = ({ users, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserIdError(false);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserEmpty = !userId;

    setHasTitleError(isTitleEmpty);
    setHasUserIdError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    onSubmit({ title, userId });

    // очистка форми
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmitForm}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </div>
  );
};
