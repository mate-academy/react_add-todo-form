import React, { useState } from 'react';
import usersFromServer from '../api/users';
import { Todo } from './types';

type Props = {
  addTodoHandler: (newTodo: Omit<Todo, 'id'>) => void,
};

export const AddTodoForm: React.FC<Props> = ({ addTodoHandler }) => {
  const [todoName, setTodoName] = useState('');
  const [todoNameError, setTodoNameError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoName(event.target.value);

    if (todoNameError) {
      setTodoNameError(false);
    }
  }

  function resetForm() {
    setTodoName('');
    setUserId(0);
  }

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let isError = false;

    if (todoName === '') {
      setTodoNameError(true);
      isError = true;
    }

    if (userId === 0) {
      setUserIdError(true);
      isError = true;
    }

    if (isError) {
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
    <form onSubmit={handleOnSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder=""
          value={todoName}
          onChange={handleChange}
        />

        {todoNameError && (
          <span className="error">
            Please enter a title
          </span>
        )}
      </div>

      <div>
        <select
          data-cy="userSelect"
          value={userId}
          onChange={(event) => {
            setUserId(+event.target.value);

            if (userIdError) {
              setUserIdError(false);
            }
          }}
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

        {userIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
