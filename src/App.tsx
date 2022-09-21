import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './react-app-env';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUserSelect, setErrorUserSelect] = useState(false);

  const [todos, setTodos] = useState(todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  })));

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setTodos([...todos, {
      id: todosFromServer.length,
      title,
      completed: false,
      userId: +selectedUser,
      user: getUser(+selectedUser),
    }].filter(todo => todo.title.trim() !== '' && todo.userId !== 0));

    if (selectedUser !== 0) {
      setTitle('');
    }

    if (title !== '') {
      setSelectedUser(0);
    }

    setErrorTitle(title === '' && true);
    setErrorUserSelect(selectedUser === 0 && true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setErrorTitle(false);
              }}
            />
            {errorTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={(event) => {
                setSelectedUser(+event.target.value);
                setErrorUserSelect(false);
              }}
            >
              <option
                value="0"
                disabled
                selected
              >
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {errorUserSelect && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList props={todos} />
    </div>
  );
};
