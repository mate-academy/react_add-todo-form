import { useState } from 'react';
import { User } from '../../types/User';

type Props = {
  onSubmit: (title: string, userId: number) => void;
  users: User[];
};

export const TodoForm: React.FC<Props> = ({ onSubmit, users }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit(title, userId);

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <div className="field">
        <label htmlFor="form-title">
          Title:
          <input
            placeholder="Enter a title"
            id="form-title"
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={handleTitleChange}
          />
        </label>
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="form-user">User:</label>
        <select
          id="form-user"
          value={userId}
          onChange={handleSelectChange}
          data-cy="userSelect"
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

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
