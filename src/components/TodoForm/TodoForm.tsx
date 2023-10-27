import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  setNewTodos: (val: any) => void;
  newTodos: Todo[];
};

export const TodoForm: React.FC<Props> = ({ setNewTodos, newTodos }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const addTodo = (newPreparedTodo: Todo) => {
      setNewTodos((currentTodos: any) => [
        ...currentTodos,
        { ...newPreparedTodo },
      ]);
    };

    const newPreparedTodo: Todo = {
      id: Math.max(...newTodos.map(t => t.id)) + 1,
      completed: false,
      title,
      userId,
      user: getUserById(userId),
    };

    reset();
    addTodo(newPreparedTodo);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  function validateTitle(input: string) {
    const validateInput = input.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    return validateInput;
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validateInput = validateTitle(event.target.value);

    setTitle(validateInput);
    setHasTitleError(false);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {hasTitleError
          && (
            <span className="error">Please enter a title</span>
          )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>
          {usersFromServer.map((user: User) => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>

        {hasUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
