import React, { SyntheticEvent, useState } from 'react';
import users from '../../api/users';

interface Props {
  onAdd: (todo: TodoCreateData) => void;
}

export type TodoCreateData = {
  title: string;
  userId: number;
};

export const NewTodo: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!title) {
      setTitleError('Please enter a title');
    }

    if (!userId) {
      setUserIdError('Please choose a user');
    }

    if (title && userId) {
      onAdd({ title, userId });
      setTitle('');
      setUserId(0);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          Title:
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Please enter a title"
            onChange={handleChange}
          />
        </label>

        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="user-id">User:</label>

        <select
          data-cy="userSelect"
          id="user-id"
          value={userId}
          onChange={event => {
            setUserId(+event.target.value);
            setUserIdError('');
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

        {userIdError && <span className="error">{userIdError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
