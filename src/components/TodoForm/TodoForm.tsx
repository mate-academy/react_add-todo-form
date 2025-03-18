import { useState } from 'react';
import { IUser, OnAddCallback } from '../../types/todo';
import { sanitizeStringAlpha } from '../helpers';

type Props = {
  users: IUser[];
  onAdd: OnAddCallback;
};

export const TodoForm: React.FC<Props> = ({ users, onAdd }) => {
  const [title, setTitle] = useState('');
  const [titleHasError, setTitleHasError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdHasError, setUserIdHasError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
    setTitleHasError(false);
    setUserIdHasError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUserIdHasError(!userId);
    setTitleHasError(!title);

    if (!(title && userId)) {
      return;
    }

    onAdd({ title, userId });

    reset();
  };

  const handleTitleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = sanitizeStringAlpha(
      ev.target.value,
      /[A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]/,
    );

    setTitle(sanitizedInput);
    setTitleHasError(false);
  };

  const handleUserChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+ev.target.value);
    setUserIdHasError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title:&nbsp;</label>
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          name="title"
          placeholder="Enter a title"
          onChange={handleTitleChange}
        />
        {titleHasError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User:&nbsp;</label>
        <select
          data-cy="userSelect"
          name="user"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userIdHasError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
