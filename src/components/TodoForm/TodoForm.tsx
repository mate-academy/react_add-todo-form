import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { User } from '../../Types/User';
import { getUserById } from '../Services/User';
import { Todos } from '../../Types/Todos';

type Props = {
  onSubmit: (todos: Todos) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="todo-user">{'User: '}</label>
        <select
          id="todo-user"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
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
        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
