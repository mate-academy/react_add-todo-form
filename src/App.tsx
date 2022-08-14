import React, { useState } from 'react';
import './App.scss';
import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList/TodoList';

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

const getUniqueTodoID = () => Math.max(...todos.map(todo => todo.id)) + 1;

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userID, setUserID] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value.trimStart().replace(/[^\s\da-zа-яёії]/gi, ''));
    if (value !== '') {
      setErrorTitle(false);
    }
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserID(+event.target.value);
    if (event.target.value !== '') {
      setErrorUser(false);
    }
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userID === 0 || title === '') {
      setErrorTitle(title === '');
      setErrorUser(userID === 0);

      return;
    }

    todos.push({
      id: getUniqueTodoID(),
      userId: userID,
      title: title.trimEnd(),
      completed: false,
      user: getUser(userID),
    });
    setTitle('');
    setUserID(0);
  };

  return (
    <div className="App">
      <h1 className="title is-2">Add todo form</h1>

      <form
        className="App__form box"
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label className="title is-6">
            Title
            <input
              value={title}
              className="input"
              placeholder="Title"
              type="text"
              data-cy="titleInput"
              onChange={handleChangeTitle}
            />
          </label>
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="title is-6">
            User
            <select
              className="App__select select"
              data-cy="userSelect"
              value={userID}
              onChange={handleChangeUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>))}
            </select>
          </label>
          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button
          className="App__button button is-success"
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
