import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
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
      className="todo-form"
      action="/api/todos"
      method="POST"
      onSubmit={handleSumbit}
    >
      <div className="todo-form__field">
        <label className="todo-form__label" htmlFor="title">Title: </label>
        <input
          className="todo-form__input"
          id="title"
          type="text"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleChange}
          data-cy="titleInput"
        />
        {hasTitleError && (
          <span className="todo-form__error">Please enter a title*</span>
        )}
      </div>

      <div className="todo-form__field">
        <label className="todo-form__label" htmlFor="userSelect">User: </label>
        <select
          className="todo-form__select"
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
          key={userId}
        >
          <option
            className="todo-form__option"
            value="0"
            disabled
          >
            Choose a user
          </option>
          {usersFromServer.map((user, i) => (
            <option
              className="todo-form__option"
              key={user.id}
              value={i + 1}
            >
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="todo-form__error">Please choose a user*</span>
        )}
      </div>

      <button className="todo-form__btn" type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
