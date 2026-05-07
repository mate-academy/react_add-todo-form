import { useState } from 'react';
import { User } from '../../types/User';

interface Props {
  users: User[];
  onAdd: (title: string, userId: User['id']) => void;
}

const DISALLOWED_CHARS_PATTERN = /[^A-Za-zА-Яа-яІіЇїЄєҐґ0-9 ]/g;

export const TodoForm = ({ users, onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<User['id']>(0);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const isTitleFilled = title.trim() !== '';
  const isUserIdSelected = userId !== 0;

  const isFormFilled = isTitleFilled && isUserIdSelected;

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setShowTitleError(false);
    setShowUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(
      event.target.value
        .trimStart()
        .replace(DISALLOWED_CHARS_PATTERN, '')
        .replace(/ +/g, ' '),
    );
    setShowTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setShowUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormFilled) {
      setShowTitleError(!isTitleFilled);
      setShowUserError(!isUserIdSelected);

      return;
    }

    onAdd(title.trim(), userId);

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title:</label>
        <input
          id="titleInput"
          type="text"
          placeholder="Enter a title"
          maxLength={255}
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />
        {showTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User:</label>
        <select
          id="userSelect"
          data-cy="userSelect"
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
        {showUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
