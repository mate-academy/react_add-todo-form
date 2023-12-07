import { useState } from 'react';
import { User } from '../../type/User';

interface Props {
  users: User[];
  onAdd: (title: string, userId: number) => void;
}

export const Form: React.FC<Props> = ({ users, onAdd }) => {
  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [isUserError, setIsUserError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleOnSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsTitleError(!title);
    setIsUserError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd(title, userId);
    clearForm();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleOnSumbit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />
        {isTitleError && (
          <span className="error">Please enter a title</span>)}

      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          name="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option
            value="0"
            disabled
          >
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        {isUserError
          && (<span className="error">Please choose a user</span>)}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
