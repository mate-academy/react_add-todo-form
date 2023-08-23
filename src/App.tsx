import React, { FormEventHandler, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, User } from './types/index';
// import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

export function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setuserId] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [buttonClicked, setbuttonClicked] = useState(false);

  const titleChange = (x: string) => {
    setTitle(x);
  };

  const userIdChange = (x: number) => {
    setuserId(x);
  };

  const formSubmittedChange = (x: boolean) => {
    setFormSubmitted(x);
  };

  const buttonClickedChange = (x: boolean) => {
    setbuttonClicked(x);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    setbuttonClicked(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" onSubmit={handleSubmit} method="POST">

        <div className="field">
          <label htmlFor="title">
            Title:
            {' '}
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              data-cy="titleInput"
            />
          </label>

          {(!title && formSubmitted) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
            {' '}
            <select
              data-cy="userSelect"
              id="user"
              name="user"
              value={String(userId)}
              onChange={(event) => setuserId(Number(event.target.value))}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option
                  value={id}
                  key={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>

          {(!userId && formSubmitted) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
        title={title}
        userId={userId}
        buttonClicked={buttonClicked}
        titleChange={titleChange}
        userIdChange={userIdChange}
        formSubmittedChange={formSubmittedChange}
        buttonClickedChange={buttonClickedChange}
      />
    </div>
  );
};
