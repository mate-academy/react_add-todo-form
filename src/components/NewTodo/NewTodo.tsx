import { useState } from 'react';

import users from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

const pattern = /^[a-zA-Zа-яА-ЯіІїЇєЄёЁґҐ0-9\s]+$/;

type Props = {
  onSubmit: (post: Todo) => void;
};

export const NewTodo: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (titleErrorMessage) {
      setTitleErrorMessage('');
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    if (hasUserIdError) {
      setHasUserIdError(!hasUserIdError);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleErrorMessage('Please enter a title');
    } else if (!pattern.test(title)) {
      setTitleErrorMessage('Please use only letters (ua and en),'
        + 'digits, and spaces in the title');
    } else {
      setTitleErrorMessage('');
    }

    setHasUserIdError(!userId);

    if (!title || !userId || !pattern.test(title)) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="titleInput">
          Title:
        </label>

        <input
          type="text"
          id="titleInput"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {titleErrorMessage && (
          <span className="error">
            {titleErrorMessage}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">
          User:
        </label>

        <select
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="error">
            Please choose a user
          </span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
