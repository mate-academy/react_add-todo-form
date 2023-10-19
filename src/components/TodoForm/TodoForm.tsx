import { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title.trim()) {
      setHasTitleError(true);

      return;
    }

    setHasTitleError(false);
    setHasUserIdError(!userId);

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
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <span>Title:&nbsp;</span>

        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <span>User:&nbsp;</span>

        <select
          data-cy="userSelect"
          value={userId}
          required
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
