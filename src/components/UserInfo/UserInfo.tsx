import { useState } from 'react';

// import
import usersFromServer from '../../api/users';
import { User } from '../../types/types';

// Type
type NewTodoData = {
  title: string;
  userId: number;
  completed: boolean;
};

type Props = {
  onSubmit: (data: NewTodoData) => void;
};

export const UserInfo: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  // error
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  // #Title
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  // #User
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = +event.target.value;

    setUserId(selectedUserId);
    if (hasUserError && selectedUserId !== 0) {
      setHasUserError(false);
    }
  };

  // #Submit
  const hendelSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      userId,
      title,
      completed: false,
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={hendelSubmit}>
      <div className="field">
        <label htmlFor="title-id">&nbsp;Title:&nbsp;</label>

        <input
          id="title-id"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />

        {hasTitleError && (
          <span className="error">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please enter a title
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user-id">User:&nbsp;</label>

        <select
          id="user-id"
          data-cy="userSelect"
          value={userId}
          required
          onChange={handleUserChange}
        >
          <option value={0} disabled>
            Choose a user
          </option>

          {usersFromServer.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && (
          <span className="error">&nbsp;&nbsp;Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
