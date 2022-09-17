import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosWithUser = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorUserSelect, setErrorUserSelect] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  const getMaxId = () => {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const clear = () => {
    setTitle('');
    setUserId(0);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    if (userId === 0) {
      setErrorUserSelect('Please choose a user');

      isValid = false;
    }

    if (title.trim() === '') {
      setErrorTitle('Please enter a title');

      isValid = false;
    }

    if (isValid) {
      const newTodo = {
        id: getMaxId(),
        title,
        completed: false,
        userId: Number(userId),
        user: getUserById(Number(userId)),
      };

      setTodos((currentTodos) => [...currentTodos, newTodo]);
      clear();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorTitle('');
            }}
          />
          {errorTitle && (
            <span className="error">{ errorTitle }</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(Number(event.target.value));
              setErrorUserSelect('');
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {errorUserSelect && (
            <span className="error">{ errorUserSelect }</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
