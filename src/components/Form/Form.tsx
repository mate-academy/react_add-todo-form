import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const Form: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setHasTitleError(false);
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUser(+event.target.value);
    setHasSelectError(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectError(!selectedUser);

    if (title && selectedUser) {
      onAdd({
        id: 0,
        title,
        completed: false,
        userId: selectedUser,
      });
      setCount(count + 1);
      setTitle('');
      setSelectedUser(0);
    }
  }

  return (
    <form key={count}>
      <div className="field">
        <label htmlFor="title">Title: </label>

        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>

        <select
          id="user"
          data-cy="userSelect"
          value={selectedUser}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>
          {usersFromServer.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {hasSelectError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        onClick={handleSubmit}
      >
        Add
      </button>
    </form>
  );
};
