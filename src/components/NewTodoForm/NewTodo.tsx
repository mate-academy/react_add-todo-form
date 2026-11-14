import { Fragment, useState } from 'react';
import { User } from '../../types/user';

type Props = {
  users: User[];
  onAdd: (title: string, userId: number) => void;
};

const titleAllowedCharsPattern = /[^a-zA-Zа-щьюяіїєґА-ЩЬЮЯІЇЄҐ0-9 ]/g;

export const NewTodoForm = ({ users, onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(titleAllowedCharsPattern, ''));
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setHasTitleError(!trimmedTitle);
    setHasUserError(!userId);

    if (!trimmedTitle || !userId) {
      return;
    }

    onAdd(trimmedTitle, Number(userId));

    setTitle('');
    setUserId('');
  };

  return (
    <Fragment>
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <label htmlFor="titleInput">Enter Title</label>
        <div className="field">
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <label htmlFor="userSelect">Assign to User</label>
        <div className="field">
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </Fragment>
  );
};
