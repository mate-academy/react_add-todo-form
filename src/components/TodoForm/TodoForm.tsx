import { useState } from 'react';
import { User } from '../../types';

type Props = {
  users: User[];
  onAdd: (title: string, userId: number) => void;
};

export const TodoForm: React.FC<Props> = ({ users, onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (!userId) {
      setUserError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onAdd(title, Number(userId));

    setTitle('');
    setUserId('');
    setTitleError('');
    setUserError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title</label>
        <input
          id="titleInput"
          type="text"
          data-cy="titleInput"
          placeholder="Enter title"
          value={title}
          onChange={event => {
            const clean = event.target.value.replace(
              /[^a-zA-Zа-яА-Я0-9 ]/g,
              '',
            );

            setTitle(clean);
            setTitleError('');
          }}
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User</label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={event => {
            setUserId(event.target.value);
            setUserError('');
          }}
        >
          <option value="" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && <span className="error">{userError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
