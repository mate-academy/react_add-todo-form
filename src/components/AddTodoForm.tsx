import React, { useState } from 'react';
import usersFromServer from '../api/users';
import { Todo, User } from './types';

type Props = {
  onAddTodo: (newTodo: Omit<Todo, 'id'>) => void,
  getUserById: (userId: number) => User | null,
};

export const AddTodoForm: React.FC<Props> = ({
  onAddTodo,
  getUserById,
}) => {
  const [todoName, setTodoName] = useState('');
  const [hasTodoNameError, setHasTodoNameError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  function handleTodoNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoName(event.target.value);

    setHasTodoNameError(false);
  }

  function handleUserIdChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);

    setHasUserIdError(false);
  }

  function resetForm() {
    setTodoName('');
    setUserId(0);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTodoName = todoName.trim();

    setHasTodoNameError(!newTodoName);
    setHasUserIdError(!userId);
    if (!newTodoName || !userId) {
      return;
    }

    const user = getUserById(userId);

    const newTodo: Omit<Todo, 'id'> = {
      title: newTodoName,
      completed: false,
      userId,
      user,
    };

    onAddTodo(newTodo);
    resetForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder=""
          value={todoName}
          onChange={handleTodoNameChange}
        />

        {hasTodoNameError && (
          <span className="error">
            Please enter a title
          </span>
        )}
      </div>

      <div>
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
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
