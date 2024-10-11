import React, { useState } from 'react';

import usersFromServer from '../../api/users';
import { getUserById } from '../../services/getUsers';
import { Todo } from '../../types/todo';

type Props = {
  onSubmit: (todos: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handlTitleChange = (
    inputTitleEvent: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(inputTitleEvent.target.value);
    setHasTitleError(false);
  };

  const handlUserIdChange = (
    inputUserEvent: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(+inputUserEvent.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handlSubmit = (eventSubmit: React.FormEvent) => {
    eventSubmit.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <>
      <form action="/api/todos" method="POST" onSubmit={handlSubmit}>
        <div className="field">
          Title:&nbsp;
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handlTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            id="userId"
            data-cy="userSelect"
            required
            value={userId}
            onChange={handlUserIdChange}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
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
    </>
  );
};
