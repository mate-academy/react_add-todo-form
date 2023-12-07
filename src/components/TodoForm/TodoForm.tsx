import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { TodoWithUser } from '../../types';

type Props = {
  addTodoHandler: (newTodo: Omit<TodoWithUser, 'id'>) => void;
};

export const TodoForm: React.FC<Props> = ({ addTodoHandler }) => {
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

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    if (hasUserIdError) {
      setHasUserIdError(false);
    }
  };

  function handleOnAdd(event: React.FormEvent<HTMLFormElement>) {
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

    if (isError) {
      return;
    }

    const user = usersFromServer.find(({ id }) => id === userId) || null;

    const newTodo = {
      title,
      userId,
      completed: false,
      user,
    };

    addTodoHandler(newTodo);

    resetForm();
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleOnAdd}>
      <div className="field">
        <label htmlFor="title-input">Title:&nbsp;</label>
        <input
          id="title-input"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user-id">User:&nbsp;</label>
        <select
          id="user-id"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value={0}>Choose a user</option>

          {usersFromServer.map((user) => (
            <option value={user.id} key={user.id}>
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
