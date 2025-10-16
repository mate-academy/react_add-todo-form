import React, { useState } from 'react';

import { User } from '../../types/User';

type TodoDraftLocal = {
  title: string;
  userId: number;
};

type Errors = {
  title?: boolean;
  userId?: boolean;
};

type Props = {
  users: User[];
  onAdd: (draft: TodoDraftLocal) => void;
};

export const AddTodoForm: React.FC<Props> = ({ onAdd, users }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);

  const [errors, setErrors] = useState<Errors>({});

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯіІїЇєЄ0-9\s]/g,
      '',
    );

    setTitle(cleanValue);

    if (errors.title) {
      setErrors(prev => ({ ...prev, title: false }));
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));

    if (errors.userId) {
      setErrors(prev => ({ ...prev, userId: false }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Errors = {};

    if (!title.trim()) {
      newErrors.title = true;
    }

    if (userId === 0) {
      newErrors.userId = true;
    }

    setErrors(newErrors);

    if (newErrors.title || newErrors.userId) {
      return;
    }

    onAdd({ title: title.trim(), userId });

    setTitle('');
    setUserId(0);
  };

  return (
    <form onSubmit={handleSubmit} action="/api/todos" method="POST">
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          name="title"
          placeholder="Enter a title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          data-cy="titleInput"
        />
        {errors.title && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          id="user"
          name="user"
          value={userId}
          onChange={handleUserIdChange}
          data-cy="userSelect"
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {users.map(user => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>

        {errors.userId && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
