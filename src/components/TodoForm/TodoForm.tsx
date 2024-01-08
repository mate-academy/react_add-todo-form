import { useState } from 'react';
import { Todo } from '../../types/todo';

import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

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
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId: 0,
      user: getUserById(+userId),
    });

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
        <label htmlFor="todo-title">Title:</label>
        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}

      </div>

      <div className="field">
        <label htmlFor="todo-userIdSelect">User:</label>
        <select
          id="todo-userIdSelect"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0">Choose a user</option>

          {usersFromServer.map((user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          )))}
        </select>

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
