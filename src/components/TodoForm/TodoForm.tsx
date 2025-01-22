import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/getUserById';
import { User } from '../../types/User';

type Props = {
  onSubmit: (todo: Todo) => void;
  users: User[];
};

export const TodoForm: React.FC<Props> = ({ onSubmit, users }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '');

    setTitle(sanitizedValue);
    setHasTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          Title:
          <input
            type="text"
            placeholder="Title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label>
          User:
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectChange}
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
