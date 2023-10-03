import React, { useState } from 'react';

import { getUser } from '../../utils';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  users: User[];
}

export const TodoForm: React.FC<Props> = ({ addTodo, users }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const restart = () => {
    setTitle('');
    setUserId(0);
    setHasUserError(false);
    setHasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setHasTitleError(true);

      return;
    }

    if (userId === 0) {
      setHasUserError(true);

      return;
    }

    addTodo({
      title: title.trim(),
      completed: false,
      userId,
      user: getUser(userId),
    });

    restart();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="titleInput">
          Title:
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleChangeTitle}
          />
        </div>
        {hasTitleError && (
          <p className="help is-danger">Please enter a title</p>
        )}
      </div>
      <div className="field">
        <label className="label" htmlFor="selectUser">
          User:
        </label>
        <div className="control">
          <div className="select" id="selectUser">
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleChangeUser}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {hasUserError && (
            <p className="help is-danger">Please choose a user</p>
          )}
        </div>
      </div>

      <div className="buttons">
        <button className="button is-link" type="submit" data-cy="submitButton">
          Add
        </button>
      </div>
    </form>
  );
};
