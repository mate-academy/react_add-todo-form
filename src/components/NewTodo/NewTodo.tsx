import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { getUserById } from '../../service/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const NewTodo: React.FC<Props> = ({ onSubmit }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [hasSelectionError, setSelectionError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setSelectionError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setSelectionError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title
        </label>
        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Title input"
          onChange={handleTitleChange}
          onBlur={() => {
            setTitleError(!title);
          }}
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="todo-user-id">Subject</label>
        <select
          id="todo-user-id"
          value={userId}
          onChange={handleUserIdChange}
          data-cy="userSelect"
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasSelectionError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
