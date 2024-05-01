import { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todos';
import { getUserById } from '../../services/user';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [hasTitleError, setHasTitleError] = useState(false);
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      userId,
      title,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleAdd}>
      <div className="field">
        <label>
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label>
          User:
          <select
            data-cy="userSelect"
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
        </label>

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
