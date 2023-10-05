import React, { useState } from 'react';
import classNames from 'classnames';

import usersFromServer from '../../api/users';
import { getUserById } from '../../servises/UserById';
import { Todo } from '../../types/Todo';

import './TodoForm.scss';

type Props = {
  onAdd: (newTodo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleSpacesError = () => {
    if (title && title.trim().length === 0) {
      setTitleError('Input can\'t be filled with only spaces');

      return;
    }

    if (!title) {
      setTitleError('Please enter a title');

      return;
    }

    setTitleError('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const checkString = value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
    const correctInput = checkString.length === value.length;

    if (correctInput) {
      setTitle(value);
      setTitleError('');
    } else {
      setTitleError('Allow only letters (ua and en), digits, and spaces');
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const resetFields = () => {
    setTitle('');
    setTitleError('');
    setUserId(0);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    }

    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    resetFields();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label className="label" htmlFor="todo-title">Title: </label>
        <input
          id="todo"
          className={classNames('input', {
            'is-danger': titleError !== '',
          })}
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleSpacesError}
        />

        {titleError !== ''
          && <p className="help is-danger">{titleError}</p>}
      </div>

      <div className="field">
        <label className="label" htmlFor="user-select">User:</label>
        <select
          className={classNames('checkbox', {
            'is-danger': userIdError,
          })}
          data-cy="userSelect"
          id="todo-user-id"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userIdError
        && <span className="help is-danger">Please choose a user</span>}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        className="button"
      >
        Add
      </button>
    </form>
  );
};
