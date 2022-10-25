import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('0');
  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [availableTodos, setAvailableTodos] = useState(todosFromServer);

  const errors = () => {
    if (user === '0') {
      setErrorUser(true);
    }

    if (!title) {
      setErrorTitle(true);
    }
  };

  const clearState = () => {
    setTitle('');
    setUser('0');
  };

  const newTodoId = () => {
    const arrayTodoId = availableTodos.map(todo => todo.id);
    const id = Math.max(...arrayTodoId) + 1;

    return id;
  };

  const handleTitle = (value: string) => {
    setErrorTitle(false);
    setTitle(value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    errors();

    if (user === '0' || !title) {
      return;
    }

    const userObject = usersFromServer
      .find(userName => userName.id === +(user));

    if (userObject) {
      const newTodo = {
        id: newTodoId(),
        title,
        completed: false,
        userId: userObject.id,
      };

      setAvailableTodos(visible => (
        [
          ...visible,
          newTodo,
        ]
      ));

      clearState();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            name="title"
            onChange={(event) => (
              handleTitle(event.target.value)
            )}
          />
          { errorTitle
              && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            name="user"
            onChange={(event) => {
              setUser(event.target.value);

              if (event.target.value !== '0') {
                setErrorUser(false);
              }
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(userToSelect => (
              <option
                key={userToSelect.id}
                value={userToSelect.id}
              >
                {userToSelect.name}
              </option>
            ))}
          </select>

          {errorUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={(event) => {
            handleSubmit(event);
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={availableTodos} />
    </div>
  );
};
