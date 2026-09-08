import React, { useState } from 'react';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onAddTodo: (title: string, userId: number) => void;
};

export const TodoForm: React.FC<Props> = ({ users, onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(Number(event.target.value));
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserUnselected = userId === 0;

    if (isTitleEmpty || isUserUnselected) {
      setHasTitleError(isTitleEmpty);
      setHasUserError(isUserUnselected);
      return;
    }

    onAddTodo(title.trim(), userId);

    setTitle('');
    setUserId(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="todo-title">Title: </label>
        <input
          id="todo-title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
          data-cy="titleInput"
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div>
        <label htmlFor="todo-user">User: </label>
        <select
          id="todo-user"
          value={userId}
          onChange={handleUserChange}
          data-cy="userSelect"
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {hasUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};