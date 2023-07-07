import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [titleErrMsg, setTitleErrMsg] = useState('');

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasUserIdError(false);
    setTitleErrMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setTitleErrMsg('Please enter a title');
    } else if (title.startsWith(' ')) {
      setTitleErrMsg('Title shuld not starts/ends with space');
    }

    setHasUserIdError(!userId);

    if (!title || !userId || title.startsWith(' ')) {
      return;
    }

    onSubmit({
      id: 0,
      userId,
      title: title.trim(),
      completed: false,
      user: getUserById(userId),
    });

    reset();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleErrMsg('');
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <div className="field">
        <label
          className="label"
          htmlFor="todo-title"
        >
          <strong>Title: </strong>
        </label>
        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          placeholder="Title input"
          value={title}
          onChange={handleTitleChange}
        />

        {titleErrMsg && (
          <span className="error">{titleErrMsg}</span>
        )}

      </div>

      <div className="field">
        <label
          className="label"
          htmlFor="todo-user-id"
        >
          <strong>User: </strong>
        </label>
        <select
          id="todo-user-id"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0">Choose a user</option>
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

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
