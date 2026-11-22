import React, { useState } from 'react';
import { User } from '../../types/Users';

type Props = {
  users: User[];
  onAdd: (title: string, userId: number) => void;
};

type Errors = {
  title: string;
  user: string;
};

type ErrorMessageProps = {
  message: string;
};

const formClasses = [
  'bg-white shadow-md rounded',
  'px-8 pt-6 pb-8 mb-4',
  'flex flex-col gap-4',
].join(' ');

const inputClasses = [
  'shadow appearance-none border',
  'rounded w-full py-2 px-3 text-gray-700',
  'leading-tight focus:outline-none focus:shadow-outline',
].join(' ');

const selectClasses = [
  'block appearance-none w-full',
  'bg-white border border-gray-400 hover:border-gray-500',
  'px-4 py-2 pr-8',
  'rounded shadow leading-tight',
  'focus:outline-none focus:shadow-outline',
].join(' ');

const buttonClasses = [
  'bg-blue-500 hover:bg-blue-700',
  'text-white font-bold',
  'py-2 px-4 rounded',
  'focus:outline-none focus:shadow-outline',
].join(' ');

const labelClasses = 'block text-gray-700 text-sm font-bold mb-2';

const NO_ERRORS: Errors = { title: '', user: '' };

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <span className="error text-red-500 text-xs italic mt-1">{message}</span>
  );
};

export const TodoForm = (props: Props) => {
  const { users, onAdd } = props;

  const [title, setTitle] = useState('');
  const [user, setUser] = useState('0');

  const [errors, setErrors] = useState<Errors>(NO_ERRORS);
  const validateForm = (field: string): string => {
    switch (field) {
      case 'title':
        return title.trim() ? '' : 'Please enter a title';
      case 'user':
        return user !== '0' ? '' : 'Please choose a user';
      default:
        return '';
    }
  };

  const resetForm = () => {
    setTitle('');
    setUser('0');
    setErrors(NO_ERRORS);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleError = validateForm('title');
    const userError = validateForm('user');

    setErrors({ title: titleError, user: userError });

    if (titleError || userError) {
      return;
    }

    onAdd(title.trim(), Number(user));

    resetForm();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setErrors(prev => ({ ...prev, title: '' }));
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(e.target.value);
    setErrors(prev => ({ ...prev, user: '' }));
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleFormSubmit}
      className={formClasses}
    >
      <div className="field">
        <label htmlFor="title" className={labelClasses}>
          Title:{' '}
        </label>
        <input
          className={inputClasses}
          id="title"
          type="text"
          data-cy="titleInput"
          name="title"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleChange}
        />
        <ErrorMessage message={errors.title} />
      </div>

      <div className="field">
        <label htmlFor="user" className={labelClasses}>
          User:{' '}
        </label>
        <select
          className={selectClasses}
          id="user"
          data-cy="userSelect"
          name="user"
          value={user}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <ErrorMessage message={errors.user} />
      </div>

      <button type="submit" data-cy="submitButton" className={buttonClasses}>
        Add
      </button>
    </form>
  );
};
