import React, { useState } from 'react';
import { Todo } from '../../types/todo';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todo: Todo) => void,
};

export const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle && userId) {
      setTitle('');
      setHasTitleError(true);

      return;
    }

    if (!trimmedTitle && !userId) {
      setTitle('');
      setHasTitleError(true);
      setHasUserIdError(true);

      return;
    }

    if (!title) {
        setHasTitleError(true);
      }
  
      if (!userId) {
        setHasUserIdError(true);
      }
  
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

    reset();
  };  

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          <label htmlFor="user">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleUser}           
          >
          
          <option value="0">Choose a user</option>
          
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}

          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </div>
  );
};
