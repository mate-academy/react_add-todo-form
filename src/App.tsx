import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/user';
import { Todo } from './types/todo';

export const App = () => {
  const [count, setCount] = useState(0);
  const [list, setList] = useState<Todo[]>([...todosFromServer]);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | string>('');
  const [userError, setUserError] = useState(false);

  const addTodo = () => {
    const id = Math.max(...list.map(user => user.id)) + 1;
    const user = usersFromServer.find(elem => elem.name === selectedUser)
    || usersFromServer[0];

    setList([...list,
      {
        id,
        title,
        completed: false,
        userId: user.id,
      },
    ]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;

    setTitle(currentValue);

    if (currentValue.trim().length > 0) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setUserError(false);
  };

  const reset = () => {
    setSelectedUser('');
    setTitle('');
    setUserError(false);
    setTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(title.trim().length === 0);
    setUserError(!selectedUser);

    if (!selectedUser || title.trim().length === 0) {
      return;
    }

    addTodo();
    reset();
    setCount(count + 1);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        key={count}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {titleError && (
            <span className="error">Please enter a title: </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            onChange={handleUserChange}
            defaultValue=""
          >
            <option disabled value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        users={usersFromServer}
        todos={list}
      />
    </div>
  );
};
