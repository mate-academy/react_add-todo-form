import React, { useState } from 'react';
// import usersFromServer from '../../api/users';
import { NewTodoType, User } from '../../api/types';

type Props = {
  onSubmit: (post: NewTodoType) => void;
  users: User[];
};

export const TodoForm: React.FC<Props> = ({ onSubmit, users }) => {
  // #region useStete
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);
  //#endregion
  // #region HandlesFunctions

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setShowTitleError(!title);
    setShowUserError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      title,
      userId,
    });

    reset();
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setShowTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setShowUserError(false);
  };
  //#endregion

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title:
          <input
            id="todo-title"
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={handleTitle}
          />
          {showTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </label>
      </div>

      <div className="field">
        <label htmlFor="html-user-id">
          User:
          <select
            data-cy="userSelect"
            id="user-id"
            value={userId}
            onChange={handleUserIdChange}
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
          {showUserError && <span className="error">Please choose a user</span>}
        </label>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
