import { useState } from 'react';
import usersFromServer from '../../api/users';

type Props = {
  onAdd: (title: string, userId: number) => void;
};

export const NewTodo: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const isFormValid = title.trim() !== '' && userId > 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleValid = title.trim() !== '';
    const isUserValid = userId > 0;

    setTitleError(!isTitleValid);
    setUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    onAdd(title, userId);

    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawTitle = event.target.value;
    const filteredTitle = rawTitle.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '');

    setTitle(filteredTitle);
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    if (userError) {
      setUserError(false);
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          name="title"
          type="text"
          value={title}
          data-cy="titleInput"
          onChange={handleTitleChange}
          required
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
          required
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton" disabled={!isFormValid}>
        Add
      </button>
    </form>
  );
};
