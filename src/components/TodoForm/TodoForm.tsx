import { useState } from 'react';
import usersFromServer from '../../api/users';

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handlePersonChange: (e: React.FormEvent<HTMLSelectElement>) => void
  handleTitleChange: (e: React.FormEvent<HTMLInputElement>) => void
  title: string,
  personValue: string
};

export const TodoForm: React.FC<Props> = ({
  handleSubmit,
  handlePersonChange,
  handleTitleChange,
  title,
  personValue,
}) => {
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const checkERRORS = () => {
    if (title.length === 0 || !title.trim()) {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }

    if (personValue === '') {
      setErrorUser(true);
    } else {
      setErrorUser(false);
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {errorTitle === true && (title.length === 0 || !title.trim())
          ? <span className="error">Enter a title</span> : ''}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={personValue}
          onChange={handlePersonChange}
        >
          <option value="" disabled>Choose a user</option>
          {usersFromServer.map((user) => (
            <option
              value={user.name}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {errorUser === true && personValue === ''
          ? <span className="error">Choose a user</span> : ''}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        onClick={checkERRORS}
      >
        Add
      </button>
    </form>

  );
};
