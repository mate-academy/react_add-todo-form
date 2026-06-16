import React, { useState } from 'react';
import classNames from 'classnames';
import type { Todo } from '../api/todos';
import type { User } from '../api/users';

type TodoFormProps = {
  todos: Todo[];
  users: User[];
  onAdd: (todo: Todo) => void;
};

export const TodoForm: React.FC<TodoFormProps> = ({ todos, users, onAdd }) => {
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    if (hasUserIdError) {
      setHasUserIdError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (!title) {
      setHasTitleError(true);
      hasError = true;
    }

    if (!userId) {
      setHasUserIdError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const selectedUser = users.find(user => user.id === Number(userId));

    if (!selectedUser) {
      setHasUserIdError(true);

      return;
    }

    const maxId = Math.max(0, ...todos.map(currentTodo => currentTodo.id));
    const newTodo: Todo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    onAdd(newTodo);
    setTitle('');
    setUserId('');
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  return (
    <form
      action="api/todos"
      method="POST"
      className="box"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label className="label" htmlFor="post-title">
          Title:
        </label>
        <div className="control">
          <input
            id="post-title"
            data-cy="titleInput"
            className={classNames('input', {
              'is-danger': hasTitleError,
            })}
            type="text"
            placeholder="Title input"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <p className="help is-danger">Please enter a title</p>
          )}
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="post-user-id">
          User ID:
        </label>
        <div className="control">
          <div
            className={classNames('select', {
              'is-danger': hasUserIdError,
            })}
          >
            <select
              id="post-user-id"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {users.map(user => (
                <option value={String(user.id)} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {hasUserIdError && (
            <p className="help is-danger">Please choose a user</p>
          )}
        </div>
      </div>

      <div className="buttons">
        <button type="submit" className="button is-link" data-cy="submitButton">
          Add
        </button>
      </div>
    </form>
  );
};
