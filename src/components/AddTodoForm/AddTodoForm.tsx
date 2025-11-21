import React, { useState } from 'react';
import { AddTodoFormProps } from '../../types';

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ users, onAdd }) => {
  const [title, setTitle] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [triedSubmit, setTriedSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ title?: string; user?: string }>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTriedSubmit(true);
    const newErrors: { title?: string; user?: string } = {};

    if (title.trim() === '') {
      newErrors.title = 'Please enter a title';
    }

    if (selectedUserId === '') {
      newErrors.user = 'Please choose a user';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onAdd(title.trim(), Number(selectedUserId));
      setTitle('');
      setSelectedUserId('');
      setTriedSubmit(false);
      setErrors({});
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Todo title</label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;

            setTitle(value);

            if (errors.title) {
              setErrors(prev => ({ ...prev, title: undefined }));
            }
          }}
        />

        {triedSubmit && errors.title && (
          <span className="error">{errors.title}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user">User</label>
        <select
          id="user"
          data-cy="userSelect"
          value={selectedUserId}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedUserId(event.target.value);

            if (errors.user) {
              setErrors(prev => ({ ...prev, user: undefined }));
            }
          }}
        >
          <option value="" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option key={user.id} value={String(user.id)}>
              {user.name}
            </option>
          ))}
        </select>

        {triedSubmit && errors.user && (
          <span className="error">{errors.user}</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
