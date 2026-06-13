import { useState } from 'react';
import { User } from '../../interfaces/User';

type Props = {
  onAdd: (data: { title: string; userId: number }) => void;
  users: User[];
};

export const TodoForm: React.FC<Props> = ({ onAdd, users }) => {
  const [title, setTitle] = useState('');
  const [titleTouched, setTitleTouched] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdTouched, setUserIdTouched] = useState(false);

  const titleError = titleTouched && !title;
  const userIdError = userIdTouched && !userId;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleTouched(true);
    setUserIdTouched(true);

    if (!title || !userId) {
      return;
    }

    onAdd({ title, userId });

    setTitle('');
    setUserId(0);
    setTitleTouched(false);
    setUserIdTouched(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          name="title"
          placeholder="Enter a title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          onBlur={() => setTitleTouched(true)}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => setUserId(Number(event.target.value))}
          onBlur={() => setUserIdTouched(true)}
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
