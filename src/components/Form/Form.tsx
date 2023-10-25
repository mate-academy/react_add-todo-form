import React, { useState } from 'react';
import users from '../../api/users';
import { Todo } from '../../interface/Todo';
import { getUserById } from '../../utils/usersId';

interface Props {
  onSubmit: (todo: Todo) => void
}

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
      onSubmit={handleSubmit}
      action="/api/todos"
      method="POST"
    >
      <div className="field">
        <label htmlFor="titleId">Title:</label>
        <input
          id="titleId"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {titleErrorMassege && (
          <span className="error">{titleErrorMassege}</span>
        )}

      </div>

      <div className="field">
        <label htmlFor="user">User:</label>
        <select
          data-cy="userSelect"
          id="user"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}

        </select>

        {userErrorMassege
          && (<span className="error">{userErrorMassege}</span>)}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
