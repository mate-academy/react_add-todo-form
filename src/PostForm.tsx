import usersFromServer from './api/users';
import { useState } from 'react';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const hasTitleError = titleErrorMessage !== '';
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setUserId(0);
    setTitle('');
    setTitleErrorMessage('');
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasUserIdError(!userId);

    if (!title) {
      setTitleErrorMessage('Please enter a title');

      return;
    }

    if (!userId) {
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
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        Title:&nbsp;
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={event => {
            const inputValue = event.target.value;

            setTitle(inputValue);

            if (inputValue) {
              setTitleErrorMessage('');
            } else {
              setTitleErrorMessage('Please enter a title');
            }
          }}
        />
        {hasTitleError && <span className="error">{titleErrorMessage}</span>}
      </div>

      <div className="field">
        User:&nbsp;
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(user => (
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
