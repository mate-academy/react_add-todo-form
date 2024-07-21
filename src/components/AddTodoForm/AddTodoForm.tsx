import React, { useState } from 'react';
import './AddTodoForm.scss';
import { Todo, User } from '../../utils/types';

const ALLOWED_SYMBOLS_REGEX = /^[a-zA-Zа-яА-ЯёЁіїґєІЇҐЄ0-9\s]*$/;

type Props = {
  users: User[];
  addTodo: (newTodo: Omit<Todo, 'id' | 'completed'>) => void;
};

export const AddTodoForm: React.FC<Props> = ({ users, addTodo }) => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [errors, setErrors] = useState({
    title: '',
    userSelect: '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (ALLOWED_SYMBOLS_REGEX.test(value)) {
      setErrors(prev => ({ ...prev, title: '' }));
      setTitle(e.target.value);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrors(prev => ({ ...prev, userSelect: '' }));
    setUser(+e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;

    if (!title) {
      setErrors(prev => ({ ...prev, title: 'Please enter a title' }));
      valid = false;
    }

    if (user === 0) {
      setErrors(prev => ({ ...prev, userSelect: 'Please choose a user' }));
      valid = false;
    }

    if (valid) {
      addTodo({
        title,
        userId: user,
      });

      setTitle('');
      setUser(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="field" htmlFor="title">
        Title:{' '}
        <input
          id="title"
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </label>

      <label className="field" htmlFor="user-select">
        User:{' '}
        <select
          id="user-select"
          data-cy="userSelect"
          value={user}
          onChange={handleUserChange}
        >
          <option value="0">Choose a user</option>
          {users.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
        {errors.userSelect && (
          <span className="error">{errors.userSelect}</span>
        )}
      </label>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
