/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { User, Todo } from '../types';
import { getUsers, getUserById } from '../services/user';

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
  const [todoName, setTodoName] = useState(todo?.title || '');
  const [todoNameError, setTodoNameError] = useState('');
  const [userId, setUserId] = useState(todo?.userId || 0);
  const [userIdError, setUserIdError] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const reset = () => {
    setTodoName(todo?.title || '');
    setTodoNameError('');

    setUserId(todo?.userId || 0);
    setUserIdError('');
  };

  const handleReset = () => {
    reset();
    onReset();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    // #region validation
    event.preventDefault();

    if (!todoName) {
      setTodoNameError('Name is required');
    }

    if (!userId) {
      setUserIdError('User is required');
    }

    if (!todoName || !userId) {
      return;
    }
    // #endregion

    const user = await getUserById(userId);

    const newTodo: Todo = {
      id: todo?.id || Date.now(),
      completed: false,
      title: todoName,
      userId,
      user,
    };

    onSubmit(newTodo);
    reset();
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="field">
        <input
          type="text"
          placeholder="Todo Name"
          value={todoName}
          onChange={event => {
            setTodoName(event.target.value);
            setTodoNameError('');
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

      <button type="submit">Save</button>
      <button type="reset">Cancel</button>
    </form>
  );
};
