import React, { FormEvent, useState } from 'react';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onAdd: (title: string, userId: number) => void;
};

export const CreateTodoForm = ({ users, onAdd }: Props) => {
  const [newTitle, setNewTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [newTodoUserId, setNewTodoUserId] = useState(0);
  const [todoUserIdError, setTodoUserIdError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError('');
    setTodoUserIdError('');

    const preparedTitle = newTitle.trim();
    let hasErrors = false;

    if (!preparedTitle) {
      setTitleError('Please enter a title');
      hasErrors = true;
    }

    if (newTodoUserId === 0) {
      setTodoUserIdError('Please choose a user');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    onAdd(preparedTitle, newTodoUserId);

    setNewTitle('');
    setNewTodoUserId(0);
  };

  const handleTitleChange = (value: string) => {
    setTitleError('');
    setNewTitle(value.replace(/[^a-zA-Zа-яА-ЯїЇіІєЄ0-9 ]/g, ''));
  };

  const handleUserChange = (value: number) => {
    setTodoUserIdError('');
    setNewTodoUserId(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <span>Title: </span>
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={newTitle}
          onChange={event => handleTitleChange(event.target.value.trimStart())}
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <span>User: </span>
        <select
          data-cy="userSelect"
          value={newTodoUserId}
          onChange={event => {
            handleUserChange(+event.target.value);
          }}
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

        {todoUserIdError && <span className="error">{todoUserIdError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
