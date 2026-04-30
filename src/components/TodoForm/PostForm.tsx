import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';
import { Todos } from '../../types/Todo';

type Props = {
  onSubmit: (todos: Omit<Todos, 'id'>) => void;
};

export const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userPostError, setUserPostError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserPostError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitleError(!title);
    setUserPostError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserPostError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="post-title">Title: </label>
        <input
          id="post-title"
          placeholder="Enter a title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="post-user">User: </label>
        <select
          id="post-user"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userPostError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
