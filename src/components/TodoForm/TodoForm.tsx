import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user_service';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedTitle = event.target.value.replace(
      /[^a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії0-9 ]/g,
      '',
    );

    setTitle(cleanedTitle);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const trimmedTitle = title.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!trimmedTitle);
    setHasUserIdError(!userId);

    if (!userId || !trimmedTitle) {
      return;
    }

    onSubmit({
      user: getUserById(userId),
      id: 0,
      title: trimmedTitle,
      completed: false,
      userId,
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title:
        </label>

        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          id="todo-title"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="todo-user">
          User:
        </label>
        <select
          data-cy="userSelect"
          id="todo-user"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
