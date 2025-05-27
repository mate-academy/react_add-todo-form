import React, { useState } from 'react';
import users from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

interface Props {
  onSubmit: (todo: Todo) => void;
}

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasErrorTitle, setHasErrorTitle] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasErrorUserId, setHasErrorUserId] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasErrorTitle(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasErrorUserId(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasErrorTitle(!title);
    setHasErrorUserId(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      user: getUserById(userId),
      title,
      userId,
      completed: false,
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter the title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasErrorTitle && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User:</label>
        <select
          id="user"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>

        {hasErrorUserId && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
