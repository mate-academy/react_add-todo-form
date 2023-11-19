import React, { useState } from 'react';
import { Todo } from '../../types/TodosProps';
import { getUserById } from '../../services/getUserById';
import usersFromServer from '../../api/users';

type Props = {
  onSubmit: (post: Todo) => void
};

export const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [caunt, setCaunt] = useState(0);

  const handleTitleChang = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    const findLetter = title.split('').some(element => element !== ' ');

    setHasTitleError(!findLetter);
    setHasUserIdError(userId === 0);

    if (!userId || !findLetter) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
    setCaunt(curr => curr + 1);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSumbit}
      key={caunt}
    >
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleChang}
          data-cy="titleInput"
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChang}
          key={userId}
        >
          <option
            value="0"
            disabled
          >
            Choose a user
          </option>
          {usersFromServer.map((user, i) => (
            <option
              key={user.id}
              value={i + 1}
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
  );
};
