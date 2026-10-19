import React, { useState } from 'react';
import userFromServer from '../../api/users';
import { Todo } from '../types-of-omponents';

type Props = {
  onSubmit: (post: Todo) => void;
};

export const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasOptionError, sethasOptionError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handeSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    sethasOptionError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      userId,
      completed: false,
      user: userFromServer.find(user => user.id === userId),
    });

    reset();
  };

  const handeTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handeUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    sethasOptionError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handeSubmit}>
      <div className="field">
        <label htmlFor="title-input">Title:</label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handeTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user-input">Title:</label>
        <select
          id="user-input"
          data-cy="userSelect"
          value={userId}
          onChange={handeUserIdChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {userFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {hasOptionError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
