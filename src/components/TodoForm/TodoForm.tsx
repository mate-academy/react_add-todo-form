import React, { useState } from 'react';
import usersFromServer from '../../api/users';

type Props = {
  addNewTodo: (todoTitle: string, todoUserId: number) => void
};

export const TodoForm: React.FC<Props> = ({ addNewTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [todoUserId, setTodoUserId] = useState(0);
  const [hasUserIdError, setUserIdError] = useState(false);

  const resetForm = () => {
    setTodoTitle('');
    setTodoUserId(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimTitle = todoTitle.trim();

    setHasTitleError(!trimTitle);
    setUserIdError(!todoUserId);

    if (!trimTitle || !todoUserId) {
      return;
    }

    if (!hasTitleError && !hasUserIdError) {
      addNewTodo(todoTitle, todoUserId);
      resetForm();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <form
      method="POST"
      onSubmit={handleFormSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={todoTitle}
          onChange={handleInput}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={todoUserId}
          onChange={handleSelect}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
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
  );
};
