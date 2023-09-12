import React, { useState } from 'react';
import usersFromServer from '../api/users';
import { Todo } from './types';

type Props = {
  addTodoHandler: (newTodo: Omit<Todo, 'id'>) => void,
};

export const AddTodoForm: React.FC<Props> = ({ addTodoHandler }) => {
  const [todoName, setTodoName] = useState('');
  const [hasTodoNameError, setHasTodoNameError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  function HandleOnEvent(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoName(event.target.value);

    if (hasTodoNameError) {
      setHasTodoNameError(false);
    }
  }

  function HandleOnEventChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);

    if (hasUserIdError) {
      setHasUserIdError(false);
    }
  }

  function resetForm() {
    setTodoName('');
    setUserId(0);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let isFormValid = todoName === '' || userId === 0;

    if (todoName === '') {
      setHasTodoNameError(!todoName);
      isFormValid = true;
    }

    if (userId === 0) {
      setHasUserIdError(!userId);
      isFormValid = true;
    }

    if (isFormValid) {
      return;
    }

    const user = usersFromServer.find(
      ({ id }) => id === userId,
    );

    const newTodo: Omit<Todo, 'id'> = {
      title: todoName,
      completed: false,
      userId,
      user: user || null,
    };

    addTodoHandler(newTodo);
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
          onChange={HandleOnEvent}
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
          onChange={HandleOnEventChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
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
