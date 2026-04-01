import React, { useState } from 'react';

import usersFromServer from '../../api/users';
import { User, TodoWithUser, Todo } from '../../types';
import { getUserById, getMaxTodoIdFromServer } from '../../utils';

const ERROR_TEXT_TITLE_EMPTY = 'Please enter a title';
const ERROR_TEXT_USER_ID_EMPTY = 'Please choose a user';

const baseTodoId = getMaxTodoIdFromServer() + 1;

const INITIAL_TODO_STATE: Readonly<Todo> = {
  id: baseTodoId,
  title: '',
  completed: false,
  userId: 0,
};

type Errors = {
  title: string[];
  userId: string[];
};

const INITIAL_ERRORS_STATE: Readonly<Errors> = {
  title: [],
  userId: [],
};

type Props = {
  onAddTodo: (todo: TodoWithUser) => void;
};

export const AddTodoForm: React.FC<Props> = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState<Todo>(INITIAL_TODO_STATE);
  // Once a new Todo is created and ready to be submitted, a local counter updates to calculate its id
  const [todoId, setTodoId] = useState(baseTodoId);

  const [errors, setErrors] = useState<Errors>(INITIAL_ERRORS_STATE);

  const addError = (field: keyof Errors, errorMessage: string) => {
    setErrors(prevErrors => {
      const isErrorDuplicate = prevErrors[field].includes(errorMessage);

      if (isErrorDuplicate) {
        return prevErrors;
      }

      return {
        ...prevErrors,
        [field]: [...prevErrors[field], errorMessage],
      };
    });
  };

  const clearError = (field: keyof Errors) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: [],
    }));
  };

  const isFormInvalid = (): boolean => {
    let isInvalid = false;

    if (newTodo.title.trim() === '') {
      isInvalid = true;
      addError('title', ERROR_TEXT_TITLE_EMPTY);
    }

    if (newTodo.userId === 0) {
      isInvalid = true;
      addError('userId', ERROR_TEXT_USER_ID_EMPTY);
    }

    return isInvalid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormInvalid()) {
      return;
    }

    const user = getUserById(newTodo.userId);

    if (!user) {
      throw new Error('User not found');
    }

    onAddTodo({
      ...newTodo,
      id: todoId,
      user,
    });

    setTodoId(prevId => prevId + 1);
    setNewTodo(INITIAL_TODO_STATE);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(event.target.value);

    clearError('userId');
    setNewTodo(prevTodo => ({ ...prevTodo, userId }));
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearError('title');
    setNewTodo(prevTodo => ({
      ...prevTodo,
      title: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={newTodo.title}
          onChange={handleChangeTitle}
        />
        {errors.title.length > 0 &&
          errors.title.map(error => (
            <span className="error" key={error}>
              {error}
            </span>
          ))}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={newTodo.userId}
          onChange={handleUserSelect}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map((user: User) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.userId.length > 0 &&
          errors.userId.map(error => (
            <span className="error" key={error}>
              {error}
            </span>
          ))}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
