import { useState } from 'react';

import usersFromServer from '../../api/users';

type Props = {
  onAdd: (title:string, selectedUserId:number) => void;
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasSelectedUserIdError, setHasSelectedUserIdError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setSelectedUserId(0);
    setHasSelectedUserIdError(false);
    setHasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectedUserIdError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    onAdd(title, selectedUserId);

    resetForm();
  };

  const handleOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleOnChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasSelectedUserIdError(false);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label>
          Title:&nbsp;

          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleOnChangeTitle}
          />
        </label>
        {hasTitleError && (
          <span className="error">
            Please enter a title
          </span>
        )}
      </div>

      <div className="field">
        <label>
          User:&nbsp;

          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleOnChangeUser}
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
        </label>
        {hasSelectedUserIdError && (
          <span className="error">
            Please choose a user
          </span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
