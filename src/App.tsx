import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TODO } from './types/todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState([...todosFromServer]);

  const [title, setTitle] = useState('');
  const [currUser, setCurrUser] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const reset = () => {
    setTitle('');
    setCurrUser(0);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (currUser === 0) {
      setUserError(true);
    }

    if (!title || !currUser) {
      return;
    }

    const todo: TODO = {
      id: [...visibleTodos].sort((a, b) => b.id - a.id)[0].id + 1,
      title,
      userId: currUser,
      completed: false,
    };

    setVisibleTodos([...visibleTodos, todo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={e => submit(e)} action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={e => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            value={currUser}
            id="user"
            onChange={e => {
              setCurrUser(parseInt(e.target.value));
              setUserError(false);
            }}
            data-cy="userSelect"
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map((user, index) => (
              <option key={index} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
