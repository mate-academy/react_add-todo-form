import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../../servises/user';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const Form: React.FC <Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hesTitleEror, setHesTitleEror] = useState(false);
  const [hesSelectedUser, setHesSelectedUser] = useState(false);

  const handleTitleChange = (event :React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHesTitleEror(false);
  };

  const handleUserIdChange = (event :React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHesSelectedUser(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHesTitleEror(!title);
    setHesSelectedUser(userId < 1);

    if (!title || userId < 1) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />
        {hesTitleEror && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hesSelectedUser && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
