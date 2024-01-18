/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import todos from '../../api/todos';
import { getUserById } from '../../services/GetUserById';
import usersFromServer from '../../api/users';

type Props = {
  onAdd: (newValue: Todo) => void;
};

export const Form: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState(false);

  const [userId, setUserId] = useState(0);
  const [isValidUser, setIsValidUser] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !userId) {
      !title.trim() && setIsValidTitle(true);
      !userId && setIsValidUser(true);

      return;
    }

    const getMaxId = () => {
      const numArray = todos.map((todo) => todo.id);

      return Math.max(...numArray);
    };

    onAdd({
      id: getMaxId() + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsValidTitle(false);
  };

  const handleChooseUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsValidUser(false);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          id="titleInput"
          value={title}
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          onChange={handleTitle}
          required
        />
        {isValidTitle && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          id="userSelect"
          value={userId}
          data-cy="userSelect"
          onChange={handleChooseUser}
          required
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        {isValidUser && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
