import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  onAdd: (newTodo: Todo) => void;
  generateNewId: () => number;
};

export const TodoForm: React.FC<Props> = ({ onAdd, generateNewId }) => {
  const [users] = useState(usersFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    if (hasUserIdError) {
      setHasUserIdError(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isError = false;

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setHasTitleError(true);
      isError = true;
    }

    if (!userId) {
      setHasUserIdError(true);
      isError = true;
    }

    if (!trimmedTitle && !userId) {
      setHasTitleError(true);
      setHasUserIdError(true);
      isError = true;
    }

    if (isError) {
      return;
    }

    const newTodo = {
      id: generateNewId(),
      title: trimmedTitle,
      userId,
      completed: false,
    };

    onAdd(newTodo);

    resetForm();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="field">
        <label htmlFor="title">Title:&nbsp;</label>
        <input
          id="title"
          name="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        {hasTitleError
          && (
            <span className="error">
            &nbsp;Please enter a title
            </span>
          )}
      </div>

      <div className="field">
        <label htmlFor="user">User:&nbsp;</label>
        <select
          id="user"
          name="userId"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>

          {users.map(({ id, name }: User) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        {hasUserIdError
          && (
            <span className="error">
            &nbsp;Please choose a user
            </span>
          )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
