import React from 'react';
import { useState } from 'react';
import { User } from '../../types/Users';

type Props = {
  onAdd: (title: string, userId: number) => void;
  users: User[];
};

export const TodoForm: React.FC<Props> = ({ users, onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title.trim() === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (userId === 0) {
      setUserIdError(true);
    } else {
      setUserIdError(false);
    }

    if (title.trim() !== '' && userId !== 0) {
      onAdd(title, userId);
      setTitle('');
      setUserId(0);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setTitleError(false);
          }}
        />
        <label htmlFor="Title">Title</label>
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => {
            setUserId(+event.target.value);
            setUserIdError(false);
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
