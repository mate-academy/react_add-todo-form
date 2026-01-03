import { useState } from 'react';
import { User } from '../../types/user';
import { NewTodo } from '../../types/newTodo';

type Props = {
  users: User[];
  onSubmit: (todo: NewTodo) => void;
};

export const NewTodoForm: React.FC<Props> = ({ users, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const onSubmitEvent = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    if (!userId) {
      return;
    }

    onSubmit({
      title,
      userId,
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form onSubmit={onSubmitEvent}>
      <div className="field">
        <input
          type="text"
          value={title}
          data-cy="titleInput"
          onChange={event => setTitle(event.target.value)}
        />
        <span className="error">Please enter a title</span>
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => setUserId(Number(event.target.value))}
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

        <span className="error">Please choose a user</span>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
