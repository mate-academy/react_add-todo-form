import React, { useState } from 'react';
import { Todo } from '../TodoInfo';
import usersFormServer from '../../api/users';
import { getUserById } from '../../services/getUserById';
import todosFromServer from '../../api/todos';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [userNameError, setUserNameError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const checkTitle = title.trim();

    setHasTitleError(!checkTitle);
    setUserNameError(!userId);

    if (!checkTitle || !userId) {
      return;
    }

    onSubmit({
      id: Math.max(...todosFromServer.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserNameError(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      action="/api/todos"
      method="POST"
    >
      <div className="field">
        <label htmlFor="titleForm">Title:</label>
        <input
          type="text"
          data-cy="titleInput"
          id="titleForm"
          placeholder="Enter a title"
          onChange={handleTitleChange}
          value={title}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="chooseUser">User:</label>
        <select
          id="chooseUser"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFormServer.map((user) => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>

        {userNameError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
