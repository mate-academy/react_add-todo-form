import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types';
import { getUserById } from '../../services/getUser';

type Props = {
  onAdd: (newTodo: Todo) => void;
  maxId: number;
};

export const TodoForm: React.FC<Props> = ({ onAdd, maxId }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasSelectError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const newTodo = {
      id: maxId + 1,
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    onAdd(newTodo);
    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="post-title">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="post-user">User: </label>
        <select
          data-cy="userSelect"
          defaultValue=""
          required
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasSelectError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
