import React, { useState } from 'react';
import './AddTodoForm.scss';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (newTodo: Todo) => void;
};

export const AddTodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
    setHasTitleError(false);
  };

  const onUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          id="titleInput"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={onTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={onUserSelect}
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

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
