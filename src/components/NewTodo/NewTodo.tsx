import { useState } from 'react';
import usersFromServer from '../../api/users';
import { NewTodo } from '../../App';

type Props = {
  onAdd: (todo: NewTodo) => void;
};

export const NewTodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    const isTitleInvalid = !trimmedTitle;
    const isUserInvalid = userId === 0;

    setTitleError(isTitleInvalid);
    setUserError(isUserInvalid);

    if (isTitleInvalid || isUserInvalid) {
      return;
    }

    onAdd({ title: trimmedTitle, userId });

    setTitle('');
    setUserId(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          data-cy="titleInput"
          type="text"
          placeholder="Enter todo..."
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            setTitleError(false);
          }}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={e => {
            setUserId(Number(e.target.value));
            setUserError(false);
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button data-cy="submitButton" type="submit">
        Add
      </button>
    </form>
  );
};
