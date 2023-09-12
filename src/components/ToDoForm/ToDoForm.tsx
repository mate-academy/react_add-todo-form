import { useState } from 'react';
import { User } from '../../types/User';

type Props = {
  onAdd: (userId: number, newTitle: string) => void,
  users: User[],
};

export const ToDoForm: React.FC<Props> = ({ onAdd, users }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasUserError, setHasUserError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const resetForm = () => {
    setHasUserError(false);
    setHasTitleError(false);
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId || !title) {
      setHasUserError(!userId);
      setHasTitleError(!title);

      return;
    }

    onAdd(userId, title);

    resetForm();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        {Boolean(hasTitleError) && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={(event) => setUserId(+event.target.value)}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map((user: User) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {Boolean(hasUserError) && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
