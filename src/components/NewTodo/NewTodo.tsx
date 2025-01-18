import { useState } from 'react';

import usersFromServer from '../../api/users';
import { ToDo } from '../../types/ToDo';
import { getUserById } from '../../services/user';

type Props = {
  onAdd: (todo: Omit<ToDo, 'id'>) => void;
};

export const NewTodo: React.FC<Props> = ({ onAdd }) => {
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

  const handleReset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      title,
      userId,
      user: getUserById(userId),
      completed: false,
    });

    handleReset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="doto-title">Title: </label>
        <input
          type="text"
          value={title}
          data-cy="titleInput"
          onChange={handleTitleChange}
          id="doto-title"
          placeholder="Enter a title"
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="todo-user-id">User: </label>
        <select
          data-cy="userSelect"
          id="todo-user-id"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0">Choose a user</option>

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
