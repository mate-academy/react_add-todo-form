import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todos } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [list, setList] = useState(todos);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const clearFields = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setErrorUser(true);
    }

    if (!title) {
      setErrorTitle(true);
    }

    if (title && userId) {
      const todo: Todos = {
        id: list.length + 1,
        title,
        completed: false,
        userId: +userId,
        user: getUser(+userId),
      };

      setList((prevList) => [...prevList, todo]);
      clearFields();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value.trim());
              setErrorTitle(false);
            }}
          />

          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              const {
                value,
              } = event.target;

              setUserId(+value);
              setErrorUser(false);
            }}
          >
            <option value="0" selected disabled>Choose a user</option>
            {
              usersFromServer.map((user) => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"

        >
          Add
        </button>
      </form>

      <TodoList todos={list} />
    </div>
  );
};
