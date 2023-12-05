import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  onSubmit: (todo: Todo) => void;
  users: User[];
};

export const Form: React.FC<Props> = ({
  onSubmit,
  users,
}) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !userId || !title.trim()) {
      setTitleError(!title.trim());
      setUserIdError(!userId);

      return;
    }

    const todo: Todo = {
      id: 0,
      title: title.trim(),
      userId,
      completed: false,
    };

    onSubmit(todo);

    reset();
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (titleError) {
      setTitleError(!titleError);
    }

    setTitle(event.target.value);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (userIdError) {
      setUserIdError(!userIdError);
    }

    setUserId(+event.target.value);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title">
          Title:
        </label>

        <input
          type="text"
          data-cy="titleInput"
          id="title"
          placeholder="Enter a title"
          value={title}
          onChange={handleChangeTitle}
        />

        {titleError && (
          <span className="error">
            Please enter a title
          </span>
        )}

      </div>

      <div className="field">
        <label htmlFor="user">
          User:
        </label>

        <select
          data-cy="userSelect"
          id="user"
          value={userId}
          onChange={handleChangeSelect}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map((user) => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {userIdError && (
          <span className="error">
            Please choose a user
          </span>
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
