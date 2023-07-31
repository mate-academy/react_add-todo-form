/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Todo } from '../types';
import { useUsers } from './UsersContext';

type Props = {
  onSubmit: (todo: Todo) => void;
  onReset?: () => void;
  todo?: Todo,
};

export const TodoForm: React.FC<Props> = ({
  onSubmit,
  onReset = () => {},
  todo,
}) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [userId, setUserId] = useState(todo?.userId || 0);
  const [completed, setCompleted] = useState(todo?.completed || false);

  const [todoNameError, setTitleError] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const users = useUsers();

  const reset = () => {
    setTitle(todo?.title || '');
    setTitleError('');

    setUserId(todo?.userId || 0);
    setUserIdError('');

    setCompleted(todo?.completed || false);
  };

  const handleReset = () => {
    reset();
    onReset();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    // #region validation
    event.preventDefault();

    setTitleError(title ? '' : 'Name is required');
    setUserIdError(userId ? '' : 'User is required');

    if (!title || !userId) {
      return;
    }
    // #endregion

    onSubmit({
      id: todo?.id || Date.now(),
      completed,
      title,
      userId,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="field">
        <input
          type="text"
          placeholder="Todo Name"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setTitleError('');
          }}
        />
        <span className="error">{todoNameError}</span>
      </div>

      <div className="field">
        <select
          value={userId}
          onChange={event => {
            setUserId(+event.target.value);
            setUserIdError('');
          }}
        >
          <option value="0" disabled>Choose a user</option>

          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <span className="error">{userIdError}</span>
      </div>

      <div className="field">
        <input
          type="checkbox"
          checked={completed}
          onChange={e => setCompleted(e.target.checked)}
        />
        Done?
      </div>

      <button type="submit">Save</button>
      <button type="reset">Cancel</button>
    </form>
  );
};
