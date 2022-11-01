import { useState } from 'react';
import usersFromServer from '../../api/users';

type Props = {
  addNewTodo: (title: string, todoUserId: number) => void
};

export const TodoForm: React.FC<Props> = ({ addNewTodo }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setUserIdError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const onSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const trimTitle = title.trim();

    setHasTitleError(!trimTitle);
    setUserIdError(!userId);

    if (!trimTitle || !userId) {
      return;
    }

    if (!hasTitleError && !hasUserIdError) {
      addNewTodo(title, userId);
      resetForm();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <form
      method="POST"
      onSubmit={onSubmitForm}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleInput}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleSelect}
        >
          <option
            value="0"
            disabled
          >
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
