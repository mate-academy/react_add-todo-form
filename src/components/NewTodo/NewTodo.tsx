import { useState } from 'react';
import { User } from '../../types/User';

type NewTodoProps = {
  onAdd: (title: string, userId: number) => void;
  users: User[];
};

export const NewTodo = ({ onAdd, users }: NewTodoProps) => {
  const [key, setKey] = useState(0);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<User['id']>(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function handleChangeTitle(value: string) {
    setTitleError(false);
    setTitle(value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const titleCheck = !title.trim();
    const userIdCheck = userId === 0;

    if (titleCheck) {
      setTitleError(true);
    }

    if (userIdCheck) {
      setUserError(true);
    }

    if (titleCheck || userIdCheck) {
      return;
    }

    onAdd(title.trim(), userId);
    setTitle('');
    setUserId(0);
    setKey(prev => prev + 1);
  }

  function handleSelectUser(value: User['id']) {
    setUserError(false);

    if (value === userId) {
      return;
    }

    setUserId(value);
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit} key={key}>
      <div className="field">
        <input
          id="title"
          aria-label="title"
          type="text"
          data-cy="titleInput"
          placeholder="Title"
          onChange={event => handleChangeTitle(event.target.value)}
          value={title}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          id="userId"
          aria-label="User Id"
          data-cy="userSelect"
          onChange={event => handleSelectUser(Number(event.target.value))}
          value={userId}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
