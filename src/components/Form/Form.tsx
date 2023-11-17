import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../Types/Types';
import { getUserById } from '../../utils/userId';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const Form: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [titleErrorMassege, setTitleErrorMassege] = useState('');

  const [userId, setUserId] = useState(0);
  const [userErrorMassege, setUserErrorMassege] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleErrorMassege('');
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserErrorMassege('');
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setTitleErrorMassege('');
    setUserErrorMassege('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleErrorMassege('Please enter a title');
    }

    if (!userId) {
      setUserErrorMassege('Please choose a user');
    }

    if (!trimmedTitle || !userId) {
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
        <label htmlFor="title">
          Title:
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>

        { titleErrorMassege
          && <span className="error">Please enter a title</span> }
      </div>

      <div className="field">
        <label htmlFor="user">
          User:
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {userErrorMassege
          && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
