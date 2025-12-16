import React, { useState } from 'react';
import { User } from '../../types/User';

type Props = {
  addTodo: (title: string, userId: number) => void;
  users: User[];
};

interface FormData {
  title: string;
  user: string;
}

export const TodoInfo: React.FC<Props> = ({ addTodo, users }) => {
  const [formData, setformData] = useState<FormData>({
    title: '',
    user: '0',
  });

  const [hasErrors, setHasErrors] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setformData({ ...formData, [field]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = formData.title.trim();
    const normalizedUser = formData.user;

    if (!normalizedTitle || normalizedUser === '0') {
      setHasErrors(true);

      return;
    }

    addTodo(normalizedTitle, +normalizedUser);
    setformData({ title: '', user: '0' });
    setHasErrors(false);
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div className="field">
        <label htmlFor="titleInput">
          Title:&nbsp;
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            name="titleInput"
            placeholder="Enter a title"
            value={formData.title}
            onChange={event => handleChange('title', event.target.value)}
          />
        </label>

        {hasErrors && formData.title.trim() === '' && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">
          User:&nbsp;
          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={formData.user}
            onChange={event => handleChange('user', event.target.value)}
          >
            <option value="0" disabled>
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
        </label>

        {hasErrors && formData.user === '0' && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
