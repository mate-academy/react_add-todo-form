import { ChangeEvent, useState } from 'react';
import usersFromServer from '../../api/users';
// import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  onSubmit: (data: { title?: string; userId: number }) => void;
};

function getUserById(userId: number): User | undefined {
  return usersFromServer.find((user: User) => user.id === userId);
}

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [id] = useState(() => `todo-${getRandomDigits()}`);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserIdError(!userId);

    const user = getUserById(userId);

    if (title.trim() && userId) {
      if (!user) {
        setUserIdError(true);

        return;
      }

      onSubmit({
        title: title.trim(),
        userId,
      });

      setTitle('');
      setUserId(0);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTitle(value);

    if (titleError && value.trim()) {
      setTitleError(false);
    }
  };

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value;

    setUserId(value);

    if (userIdError && value !== 0) {
      setUserIdError(false);
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor={id}>Title: </label>
        <input
          type="text"
          id={id}
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="selectChoose">User: </label>
        <select
          id="selectChoose"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map((user: User) => (
            <option value={user.id} key={user.id}>
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
