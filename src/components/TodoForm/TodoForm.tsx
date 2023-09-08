import React, { useState } from 'react';
import './TodoForm.scss';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (newTodo: Todo) => void
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleReset = () => {
    setTitle('');
    setHasTitleError(false);
    setUserId(0);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!(title.trim())) {
      setHasTitleError(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (!(title.trim()) || !userId) {
      return;
    }

    onSubmit({
      id: 0,
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
    >
      <div className="field">
        <label className="label" htmlFor="todo-title">Title:&nbsp;</label>

        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="todo-user-id">User:&nbsp;</label>
        <select
          id="todo-user-id"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value={0} disabled>Choose a user</option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
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
