import React, { useState } from 'react';
import { Users } from '../../types/Users';

type Props = {
  users: Users[];
};

export const AddForm: React.FC<Props> = props => {
  const { users } = props;

  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="">
          Name:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={onTitleChange}
          />
        </label>
        <span className="error">Please enter a title</span>
      </div>

      <div className="field">
        <label htmlFor="">
          User:
          <select data-cy="userSelect" value={userId} onChange={onUserIdChange}>
            <option value="0" disabled>
              Choose a user
            </option>

            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </label>
        <span className="error">Please choose a user</span>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
