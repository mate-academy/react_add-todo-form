import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setErrorUser(false);
  };

  const addToDo = () => {
    if (title === '') {
      setErrorTitle(true);
    }

    if (!selectedUser) {
      setErrorUser(true);
    }

    if (title && selectedUser) {
      todos.push({
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: title.trim(),
        userId: selectedUser,
        completed: false,
        user: getUser(selectedUser),
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addToDo();

    setTitle('');
    setSelectedUser(0);
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
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>

          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">

          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleChangeUser}
            >
              <option
                value=""
              >
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
          </label>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
