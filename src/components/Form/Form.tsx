import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
  users: { id: number; name: string }[];
  maxId: number;
};

export const Form: React.FC<Props> = ({ onSubmit, users, maxId }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const completed = false;

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setHasTitleError(false);
  }

  function handleUserId(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      title,
      id: maxId + 1,
      user: getUserById(userId),
      completed,
      userId,
    });

    setTitle('');
    setUserId(0);
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          placeholder="Enter a title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select data-cy="userSelect" value={userId} onChange={handleUserId}>
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
