import React, { useState } from 'react';
import { Todo, User } from '../../types';
import usersFromServer from '../../api/users';

type Props = {
  onAdd: (newTodo: Todo) => void;
  users: User[];
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState<number>(0);

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [userError, setUserError] = useState<boolean>(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleTitleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(event.target.value);
  };

  const handleUserUpdate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setUserId(+event.target.value);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      title,
      userId: userId,
      completed: false,
      user: usersFromServer.find(user => user.id === userId),
    };

    setCount(prev => prev + 1);
    onAdd(newTodo);
    reset();
  };

  return (
    <form action="/api/todos" key={count} onSubmit={handleAdd} method="POST">
      <div className="field">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleUpdate}
          placeholder="Enter title"
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User:</label>
        <select
          data-cy="userSelect"
          id="user"
          value={userId}
          onChange={handleUserUpdate}
          required
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
