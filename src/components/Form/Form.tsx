import { useState } from 'react';
import users from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const Form: React.FC<Props> = ({ onSubmit }) => {
  const [titleInput, setTitleInput] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (titleInput.length === 1) {
        setTitleInput('');
        setTitleErrorMessage('');
      }
    }
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  function onlyLettersAndSpaces(val: any) {
    return /^[A-Za-z0-9 _]*$/.test(val);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onlyLettersAndSpaces(event.target.value)) {
      setTitleErrorMessage('*only letters, numbres and spaces are allowed');
    } else {
      setTitleInput(event.target.value);
      setTitleErrorMessage('');
    }
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const title = titleInput.trim();

    if (!title) {
      setTitleErrorMessage('Please enter a title');
    } else if (title.length < 5) {
      setTitleErrorMessage('Title should be more than 4 ch');
    }

    setHasUserIdError(!userId);

    if (!title || title.length < 5 || !userId) {
      return;
    }

    onSubmit({
      title,
      userId,
      id: 0,
      user: getUserById(userId),
      completed: false,
    });

    setTitleInput('');
    setUserId(0);
    setTitleErrorMessage('');
  };

  const handleOnBlur = () => {
    if (titleInput.length < 5) {
      setTitleErrorMessage('Title should be more than 4 ch');
    }
  };

  return (
    <form
      action="/api/users"
      method="POST"
      onSubmit={handleOnSubmit}
    >
      <div className="field">
        <label>
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleInput}
            onChange={handleTitleChange}
            onBlur={handleOnBlur}
            onKeyDown={keyPressHandler}
          />
        </label>
        {titleErrorMessage && (
          <span className="error">{titleErrorMessage}</span>
        )}
      </div>

      <div className="field">
        <label>
          User:
          <select
            data-cy="userSelect"
            value={userId}
            required
            onChange={handleUserId}
          >
            <option value={0}>Choose a user</option>
            {
              users.map(user => (
                <option
                  key={user.id}
                  value={+user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>
        </label>

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}

      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
