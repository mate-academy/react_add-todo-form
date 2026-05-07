import { User } from '../../types/User';
import { useState } from 'react';

interface NewTodoProps {
  userList: User[];
  onAdd: (title: string, userId: number) => void;
}

export const NewTodo = ({ userList, onAdd }: NewTodoProps) => {
  const [key, setKey] = useState(0);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<User['id']>(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function handleChangeTitle(value: string) {
    setTitleError(false);
    setTitle(value);
  }

  function handleSelectUser(value: User['id']) {
    setUserError(false);

    if (value === userId) {
      return;
    }

    setUserId(value);
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

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit} key={key}>
      <div className="field">
        <label htmlFor="title">
          <input
            id="title"
            aria-label="title"
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={event => handleChangeTitle(event.target.value)}
          />
        </label>

        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userId">
          <select
            id="userId"
            aria-label="User Id"
            data-cy="userSelect"
            value={userId}
            onChange={event => handleSelectUser(Number(event.target.value))}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {userList.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {userError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
