import { useState } from 'react';
import type { User } from '../../api/users';
import type { NewTodo } from '../../api/todos';

type Props = {
  users: User[];
  onAdd: (todo: NewTodo) => void;
};

export const AddTodoForm = ({ users, onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);

  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const sanitizeTitle = (s: string) =>
    s.replace(/[^A-Za-zА-ЩЬЮЯІЇЄҐа-щьюяіїєґ0-9\s]/g, '');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(sanitizeTitle(event.target.value));
    if (showTitleError) {
      setShowTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const v = Number(event.target.value);

    setUserId(v);
    if (showUserError) {
      setShowUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleInvalid = title.trim() === '';
    const isUserInvalid = userId === 0;

    setShowTitleError(isTitleInvalid);
    setShowUserError(isUserInvalid);

    if (isTitleInvalid || isUserInvalid) {
      return;
    }

    onAdd({ title: title.trim(), userId });
    setTitle('');
    setUserId(0);
    setShowTitleError(false);
    setShowUserError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {showTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select data-cy="userSelect" value={userId} onChange={handleUserChange}>
          <option value={0} disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {showUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
