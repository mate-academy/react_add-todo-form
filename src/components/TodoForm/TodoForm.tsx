import React, { useState } from 'react';
import './TodoForm.scss';

import { Todo } from '../../entities/todo';
import { User } from '../../entities/user';

interface TodoFormProps {
  onAdd: (todo: Todo) => void;
  users: User[];
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd, users }) => {
  const [selectUserId, setSelectUserId] = useState('0');
  const [textTitle, setTextTitle] = useState('');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(event.target.value);
    setHasUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidTitle = textTitle.trim().length > 0;
    const isValidUser = selectUserId !== '0';

    setHasTitleError(!isValidTitle);
    setHasUserIdError(!isValidUser);

    if (!isValidTitle || !isValidUser) {
      return;
    }

    const numericUserId = +selectUserId;
    const getUserById = users.find(user => user.id === numericUserId);

    const newTodo: Todo = {
      id: 0,
      title: textTitle.trim(),
      completed: false,
      userId: numericUserId,
      user: getUserById || null,
    };

    onAdd(newTodo);

    // Reset form
    setSelectUserId('0');
    setTextTitle('');
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title:</label>

        <input
          type="text"
          id="title"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={textTitle}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User:</label>

        <select
          data-cy="userSelect"
          id="user"
          value={selectUserId}
          onChange={handleUserChange}
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
        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
