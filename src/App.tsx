import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getUserByName(userName: string): User | null {
  return usersFromServer.find(user => user.name === userName) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [shouldTitleError, setShouldTitleError] = useState(false);
  const [shouldUserNameError, setShouldUserNameError] = useState(false);

  const handleTitile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setShouldTitleError(false);
  };

  const handleUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setShouldUserNameError(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && userName) {
      setTodos(prevTodos => {
        const todoUser = getUserByName(userName);
        const todoId = Math.max(...prevTodos.map(todo => todo.id));

        setTitle('');
        setUserName('');

        return [
          ...todos,
          {
            user: todoUser,
            id: todoId + 1,
            title,
            completed: false,
            userId: todoUser ? todoUser.id : null,
          },
        ];
      });
    }

    if (!title) {
      setShouldTitleError(true);
    }

    if (!userName) {
      setShouldUserNameError(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleChange}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              id="title"
              name="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitile}
            />
            {shouldTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userName}
              onChange={handleUserName}
              id="userName"
              name="User"
            >
              <option value="" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.name} key={user.id}>{user.name}</option>
              ))}
            </select>

            {shouldUserNameError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
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
