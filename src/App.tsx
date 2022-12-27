/* eslint-disable default-case */
import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userArgument: number | string): User | null {
  const foundUserById
  = usersFromServer.find(user => user.id === userArgument);

  const foundUserByName
  = usersFromServer.find(user => user.name === userArgument);

  switch (typeof userArgument) {
    case 'string':
      return foundUserByName || null;
    default:
      return foundUserById || null;
  }
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [titleName, titleState] = useState('');
  const [userName, userState] = useState('');
  const [titleBoolean, titleError] = useState(false);
  const [userBoolean, userError] = useState(false);
  const [todosArray, todoArrayModify] = useState(todos);

  const handleFormData = () => {
    const regexChars = /[\wа-я\s]/ig;
    const titleModified: string | undefined
    = titleName.match(regexChars)?.join('');
    const currentUser = getUser(userName);
    const id = currentUser?.id;
    const todosIdCollection = todosArray.map(todo => todo.id);
    const todosIdMaxValue = Math.max(...todosIdCollection);
    const newTodo: Todo | undefined = {
      id: todosIdMaxValue + 1,
      userId: id,
      title: titleModified,
      completed: false,
      user: currentUser,
    };

    switch (true) {
      case !titleModified
      && !userName:
        titleError(true);
        userError(true);
        break;
      case !titleModified:
        titleError(true);
        userError(false);
        break;
      case !userName:
        userError(true);
        titleError(false);
        break;
      case !!titleModified
      && !!userName:
        todoArrayModify(current => [...current, newTodo]);
        titleError(false);
        userError(false);
        titleState('');
        userState('');
        break;
    }
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    userState(value);
    if (value) {
      userError(false);
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    titleState(value);
    if (value) {
      titleError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="field">
          <label htmlFor="titleState">
            Title:
            <input
              id="titleState"
              type="text"
              data-cy="titleState"
              placeholder="Enter a title"
              value={titleName}
              onChange={handleTitle}
            />
          </label>
          {titleBoolean && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userState">
            User:
            <select
              id="userState"
              data-cy="userState"
              value={userName}
              onChange={handleUser}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userBoolean && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleFormData}
        >
          Add
        </button>
      </form>

      <TodoList todos={todosArray} />

    </div>
  );
};
