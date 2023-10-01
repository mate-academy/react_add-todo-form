import { useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  users: User[];
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ users, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+ev.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      title,
      id: 0,
      completed: false,
      userId,
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
        <label>
          Title:&nbsp;&nbsp;
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        {hasTitleError
          && (<span className="error">Please enter a title</span>
          )}
      </div>

      <div className="field">
        <label htmlFor="user-id">User:&nbsp;</label>
        <select
          data-cy="userSelect"
          id="user-id"
          name="user"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError
          && (<span className="error">Please choose a user</span>
          )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
