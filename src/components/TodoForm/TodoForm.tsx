import { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../servises/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /[^A-Za-z0-9А-я\s]+/;

    if (!pattern.test(event.target.value)) {
      setTitle(event.target.value);
      setHasTitleError(false);
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setCount(count + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <form key={count} action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Enter title"
          onChange={handleTitleChange}
          onBlur={() => setHasTitleError(!title)}
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userId">User: </label>
        <select
          id="userId"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
          onBlur={() => setHasUserIdError(!userId)}
        >
          <option value="0" disabled>
            Choose a user
          </option>

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
