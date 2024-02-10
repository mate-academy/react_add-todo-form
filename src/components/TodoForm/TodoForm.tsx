import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';
import './TodoForm.scss';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!userId || !title) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="field_title">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          id="field_title"
          placeholder="Enter a title"
          onChange={handleTitleChange}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="field_user">User: </label>
        <select
          data-cy="userSelect"
          value={userId}
          id="field_user"
          required
          onChange={handleUserIdChange}
        >
          <option value="0">Choose a user</option>
          {usersFromServer.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
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
