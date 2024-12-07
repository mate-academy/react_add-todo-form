/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Todo, User } from '../../types';
import classNames from 'classnames';

interface NewTodoFormProps {
  users: User[];
  onAdd: (todo: Omit<Todo, 'id'>) => void;
}

interface Errors {
  title?: string;
  userId?: string;
}

export const NewTodoForm: React.FC<NewTodoFormProps> = ({ users, onAdd }) => {
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [errors, setErrors] = useState<Errors>({});

  const [formKey, setFormKey] = useState<number>(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    const newErrors: Errors = {};

    if (trimmedTitle === '') {
      newErrors.title = 'Please enter a title';
    }

    if (userId === 0) {
      newErrors.userId = 'Please choose a user';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    const sanitizedTitle = trimmedTitle.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '');

    const newTodo = {
      title: sanitizedTitle,
      userId: userId,
      completed: false,
    };

    onAdd(newTodo);

    setFormKey(prevKey => prevKey + 1);
    setTitle('');
    setUserId(0);
    setErrors({});
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (errors.title) {
      setErrors(prevErrors => ({ ...prevErrors, title: undefined }));
    }
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    if (errors.userId) {
      setErrors(prevErrors => ({ ...prevErrors, userId: undefined }));
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      key={formKey}
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
          className={classNames('input', { 'is-danger': errors.title })}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          id="user"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
          className={classNames('select', { 'is-danger': errors.userId })}
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.userId && <span className="error">{errors.userId}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
