import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getUserName(userName: string): User | null {
  const foundUser = usersFromServer.find(user => user.name === userName);

  return foundUser || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserNameError, setIsUserNameError] = useState(false);

  const handleTitile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsTitleError(false);
  };

  const handleUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.currentTarget.value);
    setIsUserNameError(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleError(!title.trim());
    setIsUserNameError(!userName);

    if (title.trim() === '' || !userName) {
      return;
    }

    const userToAdd = getUserName(userName);

    setTodos(current => {
      const maxTodoId = Math.max(...current.map(todo => todo.id));

      return [
        ...current,
        {
          id: maxTodoId + 1,
          title,
          completed: false,
          userId: userToAdd ? userToAdd.id : null,
          user: userToAdd,
        },
      ];
    });

    setTitle('');
    setUserName('');
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
          <label className="label">
            {'Title: '}
            <input
              id="title"
              name="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitile}
              className="title"
            />
            {isTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              id="userName"
              name="User"
              data-cy="userSelect"
              value={userName}
              onChange={handleUserName}
              className="userName"
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.name} key={user.id}>{user.name}</option>
              ))}
            </select>

            {isUserNameError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
