import './TodosForm.scss';
import cn from 'classnames';
import { useState } from 'react';

import { getUserById } from '../../services/getUserById';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/todo';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodosForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [hasErrorUser, setHasErrorUser] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasErrorTitle(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasErrorUser(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasErrorTitle(!title);
    setHasErrorUser(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="titleInput">
          Title:&nbsp;
        </label>

        <input
          type="text"
          data-cy="titleInput"
          id="titleInput"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitle}
        />

        {hasErrorTitle && (
          <span className={cn({ error: hasErrorTitle })}>
            Please enter a title
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">
          User:&nbsp;
        </label>

        <select
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option
            value="0"
            disabled
          >
            Choose a user
          </option>

          {usersFromServer.map(user => {
            return (
              <option
                value={`${user.id}`}
                key={user.id}
              >
                {user.name}
              </option>
            );
          })}
        </select>

        {hasErrorUser && (
          <span className={cn({ error: hasErrorUser })}>
            Please choose a user
          </span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
