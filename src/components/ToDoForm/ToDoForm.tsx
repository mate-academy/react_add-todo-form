import { useState } from 'react';
import { User } from '../../types/User';

type Props = {
  onAdd: (userId: number, newTitle: string) => void,
  users: User[],
};

export const ToDoForm: React.FC<Props> = ({ onAdd, users }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId || !title) {
      setUserError(Boolean(!userId));
      setTitleError(Boolean(!title));

      return;
    }

    onAdd(userId, title);

    setUserError(false);
    setTitleError(false);
    setTitle('');
    setUserId(0);
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
        {Boolean(titleError) && (
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

        {Boolean(userError) && (
          <span className="error">Please choose a user</span>
        )}

      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
