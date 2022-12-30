import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(searchParameter: number | string): User | null {
  const foundUserById = usersFromServer.find(
    user => user.id === searchParameter,
  );

  const foundUserByName = usersFromServer.find(
    user => user.name === searchParameter,
  );

  if (typeof searchParameter === 'string') {
    return foundUserByName || null;
  }

  return foundUserById || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [titleName, setTitleName] = useState('');
  const [userName, setUserName] = useState('');
  const [todosArray, setTodosArray] = useState(todos);

  const titleValueModified = (titleValue: string) => {
    const regexChars = /[\wа-я\s]/ig;

    return titleValue?.match(regexChars)?.join('').trim();
  };

  const handleFormData = () => {
    const currentUser = getUser(userName);
    const id = currentUser?.id;
    const todosIdCollection = todosArray.map(todo => todo.id);
    const todosIdMaxValue = Math.max(...todosIdCollection);
    const modifiedTitle = titleValueModified(titleName);
    const newTodo: Todo | undefined = {
      id: todosIdMaxValue + 1,
      userId: id,
      title: modifiedTitle,
      completed: false,
      user: currentUser,
    };

    setIsClicked(true);

    if (userName && modifiedTitle) {
      setTodosArray(current => [...current, newTodo]);
      setTitleName('');
      setUserName('');
      setIsClicked(false);
    }
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserName(value);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitleName(value);
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
          <label htmlFor="setTitleName">
            Title:&nbsp;
            <input
              id="setTitleName"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={titleName}
              onChange={handleTitle}
            />
          </label>
          {isClicked
          && !titleValueModified(titleName)
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="setUserName">
            User:&nbsp;
            <select
              id="setUserName"
              data-cy="userSelect"
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

          {isClicked
          && !userName
          && <span className="error">Please choose a user</span>}
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
