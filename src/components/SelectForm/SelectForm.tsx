import React, { FC, useState } from 'react';

import usersFromServer from '../../api/users.json';
import { getUserById } from '../../services/user';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const SelectForm: FC<Props> = ({ onSubmit }) => {
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasTitleValidError, setHasTitleValidError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const initialTodo = {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
    user: null,
  };

  const [todo, setTodo] = useState(initialTodo);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9\sа-яА-ЯіІєЄїЇ]/g, '');

    setTodo({
      ...todo,
      title: value,
    });

    setHasTitleError(false);

    const isEmpty = value.trim().length <= 0;

    setHasTitleValidError(isEmpty);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setTodo({
      ...todo,
      userId: +value,
    });
    setHasUserIdError(false);
  };

  const reset = () => {
    setTodo(initialTodo);

    setHasUserIdError(false);
    setHasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!todo.title);
    setHasUserIdError(!todo.userId);

    if (!todo.title || !todo.userId) {
      return;
    }

    onSubmit({
      ...todo,
      user: getUserById(todo.userId),
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      className="box"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title
        </label>
        <div className="control">
          <input
            id="todo-title"
            type="text"
            placeholder="Title"
            data-cy="titleInput"
            className="input"
            value={todo.title}
            onChange={handleTitle}
            onBlur={() => {
              setHasTitleError(!todo.title);
            }}
          />

          {hasTitleError && (
            <p className="error help is-danger">Please enter a title</p>
          )}

          {hasTitleValidError && (
            <p className="error help is-danger">Title cannot be empty</p>
          )}
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="user">
          User
        </label>
        <div className="control">
          <div className="select">
            <select
              data-cy="userSelect"
              id="user"
              value={todo.userId}
              onChange={handleUserId}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasUserIdError && (
          <span className="error help is-danger">Please choose a user</span>
        )}
      </div>

      <div className="field">
        <div className="control">
          <button
            type="submit"
            data-cy="submitButton"
            className="button is-link"
            disabled={hasTitleError || hasUserIdError || hasTitleValidError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
