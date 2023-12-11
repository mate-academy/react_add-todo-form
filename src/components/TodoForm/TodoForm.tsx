import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user_service';
import { getNextAvailableId } from '../../services/todo_service';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleReset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      id: getNextAvailableId(),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    handleReset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="field">
        <label htmlFor="todo-title">
          Title:&nbsp;
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}

        </label>
      </div>

      <div className="field">
        <label htmlFor="todo-user">
          User:&nbsp;
          <select
            id="todo-user"
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map((user) => (
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
        </label>
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
