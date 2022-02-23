/* eslint-disable import/no-duplicates */
import React from 'react';
import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const getUsersByID = (userId: number) => (usersFromServer.find(user => user.id === userId));

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUsersByID(todo.userId),
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, sethasUserIdError] = useState(false);

  const [users, setUsers] = useState(preparedTodos);

  const addUsers = (titele: string, usereId: number) => {
    const newUser = {
      userId: usereId,
      id: Date.now(),
      title: titele,
      completed: false,
      user: getUsersByID(usereId),
    };

    setUsers([...users, newUser]);
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    sethasUserIdError(!userId);

    if (title && userId) {
      addUsers(title, userId);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <input
            type="text"
            value={title}
            placeholder="Enter title"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError
            && <span className="error"> Please enter the title </span>}
        </p>

        <select
          value={userId}
          onChange={(event) => {
            setUserId(+event.target.value);
            sethasUserIdError(false);
          }}
        >
          <option value="0" disabled>Please choose a user</option>

          {usersFromServer.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError
          && <span className="error"> Please choose a user </span>}
        <p>
          <button type="submit">Add</button>
        </p>

        <div className="todo">
          <h1>Static list of todos</h1>
          <ul className="todo__list">
            {users.map(todo => (
              <li className="todo__item" key={todo.id}>
                {todo.user
                  && (
                    <>
                      <p>{` User name: ${todo.user.name}`}</p>
                      <p>{` User email: ${todo.user.email}`}</p>
                    </>
                  )}
                <p>{` Todo title: ${todo.title}`}</p>
                <p>{` Todo compelted: ${todo.completed}`}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </form>

  );
};

export default App;
