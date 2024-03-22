import React, { useState } from 'react';
import users from '../../api/users';
import { Todos } from '../../types/Todos';
import { getUserById } from '../../services/users';

type Props = {
  onSubmit: (todo: Todos) => void;
};

export const FormTodo: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [chooseUser, setChooseUser] = useState(0);
  const [hasChooseUserError, setHasChooserUserError] = useState(false);

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleUserOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChooseUser(+e.target.value);
    setHasChooserUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();

    if (!title || !title.trim()) {
      setHasTitleError(true);
    }

    if (!chooseUser) {
      setHasChooserUserError(true);
    }

    if (!chooseUser || !title.trim()) {
      return;
    }

    const reset = () => {
      setHasTitleError(false);
      setHasChooserUserError(false);
      setChooseUser(0);
      setTitle('');
    };

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId: chooseUser,
      user: getUserById(chooseUser),
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          data-cy="titleInput"
          type="text"
          value={title}
          onChange={handleTitleOnChange}
          placeholder="Enter a title"
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={chooseUser}
          onChange={handleUserOnChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {hasChooseUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
