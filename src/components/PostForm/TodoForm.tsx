import { useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../servises/user';
import { Todo } from '../types/Todo';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm:React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState('');

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError('');
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title && !userId) {
      setHasTitleError('Please enter some text');
      setUserIdError(!userId);
    }

    if (!userId || !title) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);

    setHasTitleError('');
    setUserIdError(false);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <label className="field" htmlFor="post-title">
        Title:
        <input
          id="post-title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && (
          <span className="error">{hasTitleError}</span>
        )}
      </label>

      <label className="field" htmlFor="post-user-id">
        User:
        <select
          data-cy="userSelect"
          id="post-user-id"
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

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </label>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
