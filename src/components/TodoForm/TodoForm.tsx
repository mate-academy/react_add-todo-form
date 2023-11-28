import React, { useState } from 'react';
import User from '../../types/User';
import Todo from '../../types/Todo';

type Props = {
  users: User[];
  id: number;
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({
  users,
  onSubmit,
  id,
}) => {
  const [title, setTitle] = useState('');
  const [titleErr, setTitleErr] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdErr, setUserIdErr] = useState(false);

  const handleReset = () => {
    setTitle('');
    setUserId(0);
  };

  const changeUserHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setUserIdErr(false);
  };

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleErr(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emptyTitle = !title.trim();

    setTitleErr(emptyTitle);
    setUserIdErr(!userId);

    if (emptyTitle || !userId) {
      return;
    }

    handleReset();

    onSubmit({
      title,
      id,
      userId,
      completed: false,
    });
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          value={title}
          data-cy="titleInput"
          id="title"
          placeholder="Enter a title"
          onChange={changeTitleHandler}
        />
        {titleErr && <span className="error">Please enter a title</span>}

      </div>

      <div className="field">
        <label htmlFor="user-id">User: </label>
        <select
          id="user-id"
          data-cy="userSelect"
          value={userId}
          onChange={changeUserHandler}
          required
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>
        {userIdErr && <span className="error">Please choose a user</span>}
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
