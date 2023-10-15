import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onAdd: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ users, onAdd }) => {
  const [titleValue, setTitleValue] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    setHasTitleError(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const validateTitle = () => {
    // eslint-disable-next-line max-len
    if (/[^a-zA-Z0-9s\u0020\u0406\u0407\u042c\u045e\u042f\u0456\u0457\u044c\u044e\u044f\u0410-\u0429\u0430-\u0449]/.test(titleValue)) {
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!titleValue.trim());
    setHasUserError(!userId);

    if (!validateTitle() || !userId || !titleValue.trim()) {
      return;
    }

    onAdd({
      id: 0,
      title: titleValue.trim(),
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitleValue('');
    setUserId(0);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title-input">Title: </label>

        <input
          id="title-input"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={titleValue}
          onChange={handleTitleChange}
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}

        {!validateTitle() && (
          <span className="error">
            Please use only digits, &quot;en&quot; and &quot;ua&quot; characters
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user-select">User: </label>
        <select
          data-cy="userSelect"
          id="user-select"
          value={userId}
          onChange={handleUserSelect}
        >
          <option value="0" disabled>Choose a user</option>

          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
