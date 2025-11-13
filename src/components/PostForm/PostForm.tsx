import React, { useState } from 'react';
import { User } from '../../types';

type Props = {
  onAdd: (title: string, userId: number) => void;
  users: User[];
};

export const PostForm: React.FC<Props> = ({ onAdd, users }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errors, setErrors] = useState<{ title: string; user: string }>({
    title: '',
    user: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = event.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(cleanValue);

    if (errors.title) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const titleValid = title.trim() !== '';
    const userValid = userId !== 0;

    if (!titleValid || !userValid) {
      setErrors({
        title: titleValid ? '' : 'Please enter a title',
        user: userValid ? '' : 'Please choose a user',
      });

      return;
    }

    onAdd(title, userId);

    setTitle('');
    setUserId(0);
    setErrors({ title: '', user: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="Enter todo title"
          data-cy="titleInput"
          value={title}
          onChange={handleChange}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User:</label>
        <select
          id="user"
          data-cy="userSelect"
          required
          value={userId}
          onChange={event => {
            setUserId(+event.target.value);
            if (errors.user) {
              setErrors(prev => ({ ...prev, user: '' }));
            }
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
             {user.name}
            </option>
          ))}
        </select>

        {errors.user && <span className="error">{errors.user}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
