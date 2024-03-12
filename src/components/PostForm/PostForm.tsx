import { useState } from 'react';

import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const reset = () => {
    setUserId(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasUserIdError(!userId);
    setHasTitleError(!title);

    if (!userId || !title) {
      return;
    }

    reset();
    onSubmit({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });
  };

  const changeTitle = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setHasTitleError(!value);
    setTitle(value);
  };

  const changeUserId = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setHasUserIdError(!value);
    setUserId(+value);
  };

  return (
    <>
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => changeTitle(event)}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-id">User: </label>

          <select
            data-cy="userSelect"
            id="user-id"
            value={userId}
            onChange={event => changeUserId(event)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
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
