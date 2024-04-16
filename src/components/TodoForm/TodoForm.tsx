import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo, User } from '../services/types';
import { getUserById } from '../services/getUser';

type Props = {
  onAdd: (todos: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || userId === 0) {
      if (!title.trim()) {
        setTitleError(true);
      }

      if (userId === 0) {
        setUserIdError(true);
      }

      return;
    }

    onAdd({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setTitle(event.target.value);
      setTitleError(false);
    }
  };

  const handleChangeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (+event.target.value) {
      setUserId(+event.target.value);
      setUserIdError(false);
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleOnSubmit}>
      <div className="field">
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleChangeTitle}
        />

        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          required
          onChange={handleChangeUserId}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map((user: User) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
