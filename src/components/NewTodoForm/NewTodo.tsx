import { Fragment, useState } from 'react';
import { getAllUsers } from '../../services/userService';

type Props = {
  onAdd: (title: string, userId: number) => void;
};

const titleAllowedCharsPattern = /[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9\s]/g;

export const NewTodoForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(titleAllowedCharsPattern, ''));
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
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

    onAdd(trimmedTitle, userId);

    setTitle('');
    setUserId(0);
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
            <option value="0" disabled>
              Choose a user
            </option>
            {getAllUsers().map(user => (
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
