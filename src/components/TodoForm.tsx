import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { getUserById } from '../services/user';
import usersFromServer from '../api/users';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userNameError, setUserNameError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEmpty(false);
  };

  const handleUserNameChange
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setUserId(+event.target.value);
      setUserNameError(false);
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const titleNoSpacesAround = title.trim();

    setIsTitleEmpty(!titleNoSpacesAround);
    setUserNameError(!userId);

    if (!titleNoSpacesAround || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      action="/api/todos"
      method="POST"
    >

      <div className="field">
        <label htmlFor="todoTitle">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          id="todoTitle"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {isTitleEmpty && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="todoUser">User: </label>
        <select
          id="todoUser"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserNameChange}
        >
          <option value="0">Choose a user</option>

          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        {userNameError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
