import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

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

    if (!title) {
      setHasTitleError(true);
      isError = true;
    }

    if (!userId) {
      setHasUserIdError(true);
      isError = true;
    }

    if (!title && !userId) {
      setHasTitleError(true);
      setHasUserIdError(true);
      isError = true;
    }

    if (isError) {
      return;
    }

    const newTodo = {
      id: generateNewId(),
      title,
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
        <label htmlFor="title">Title:</label>
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
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User:</label>
        <select
          id="user"
          name="userId"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
