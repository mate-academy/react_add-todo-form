import React, { useState } from 'react';
import { Todo } from '../../types/Todos';
import { getUserById } from '../../services/getUserById';
import usersFromServer from '../../api/users';
import './TodoForm.scss';

type TodoFormProps = {
  onSubmit: (todo: Todo) => void
};

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setHasTitleError(!trimmedTitle);
    setHasUserIdError(userId === 0);

    if (trimmedTitle && userId > 0) {
      onSubmit({
        id: 0,
        title,
        userId,
        completed: false,
        user: getUserById(userId),
      });

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <form
      className="todoForm"
      action="/api/todos"
      method="POST"
      onSubmit={handleSumbit}
    >
      <div className="todoForm__field">
        <label className="todoForm__label" htmlFor="title">Title: </label>
        <input
          className="todoForm__input"
          type="text"
          id="title"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleChange}
          data-cy="titleInput"
        />
        {hasTitleError && (
          <span className="todoForm__error">Please enter a title*</span>
        )}
      </div>

      <div className="todoForm__field">
        <label className="todoForm__label" htmlFor="userSelect">User: </label>
        <select
          className="todoForm__select"
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
          key={userId}
        >
          <option
            className="todoForm__option"
            value="0"
            disabled
          >
            Choose a user
          </option>
          {usersFromServer.map((user, i) => (
            <option
              className="todoForm__option"
              key={user.id}
              value={i + 1}
            >
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="todoForm__error">Please choose a user*</span>
        )}
      </div>

      <button className="todoForm__btn" type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
