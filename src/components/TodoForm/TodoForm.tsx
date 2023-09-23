import React, { useState } from 'react';
import { getUserById } from '../services/userById';
import { usersForSelect } from '../services/usersForSelect';
import { Todo } from '../types/todo';
import { getNewTodoId } from '../services/newTodoId';
import todos from '../../api/todos';

interface Props {
  onSubmit: (todo: Todo) => void;
}

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  // #region state
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [user, setUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  // #endregion
  // #region change handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.replace(/[^a-zA-Za-яА-Я0-9\s]/g, '');

    setTitle(newTitle);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setHasUserError(false);
  };
  // #endregion

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!user);

    if (!title || !user) {
      return;
    }

    onSubmit({
      id: getNewTodoId(todos),
      title,
      userId: getUserById(user)?.id,
      completed: false,
    });

    setTitle('');
    setUser(0);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label
          className="label"
          htmlFor="todo-title"
        >
          {'Title: '}
        </label>

        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && (
          <span className="error">
            Please enter a title
          </span>
        )}
      </div>

      <div className="field">
        <label
          className="label"
          htmlFor="todo-user"
        >
          {'User: '}
        </label>
        <select
          data-cy="userSelect"
          id="todo-user"
          value={user}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersForSelect}
        </select>

        {hasUserError && (
          <span className="error">
            Please choose a user
          </span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
