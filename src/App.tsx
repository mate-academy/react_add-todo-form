import React, { useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList/TodoList';

import { User } from './type/User';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

function checkKey() {
  const maxId = Math.max(...(todos.map(todo => todo.id)));

  for (let i = 1; i < maxId; i += 1) {
    if (todos.every(todo => todo.id !== i)) {
      return i;
    }
  }

  return maxId + 1;
}

const addTodo = (title: string, completed: boolean, userId: number): void => {
  const newTodo = {
    id: checkKey(),
    title,
    completed,
    userId,
    user: getUser(userId),
  };

  todos.push(newTodo);
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const valueWithRules = value
      .replace(/[!@#$%'`";:|^&*,.\\<>?/()_+={\][}-]/g, '');

    setTitle(valueWithRules);

    if (valueWithRules.trim() !== '') {
      setErrorTitle(false);
    }
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(value);

    if (value !== '0') {
      setErrorUser(false);
    }
  };

  const handleChecked = () => {
    setCompleted(!completed);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() && userId === '0') {
      setErrorUser(true);
      setErrorTitle(true);

      return;
    }

    if (!title.trim()) {
      setErrorTitle(true);

      return;
    }

    if (userId === '0') {
      setErrorUser(true);

      return;
    }

    addTodo(title, completed, +userId);
    setTitle('');
    setUserId('0');
  };

  return (
    <div className="App">
      <h1 className="title title-default">Add todo form</h1>

      <form
        className="box"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label className="label">
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Title"
              className={classNames(
                'input',
                { 'is-danger': errorTitle },
              )}
              onChange={handleChangeTitle}
            />
          </label>
          {errorTitle && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <span className="label">{'User: '}</span>
          <div
            className={classNames(
              'select select-default',
              { 'is-danger': errorUser },
            )}
          >
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleSelectUser}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {errorUser && (<span className="error">Please choose a user</span>)}
        </div>

        <div className="field">
          <label className="label">
            {'Completed: '}
            <input
              type="checkbox"
              checked={completed}
              className="checkbox"
              onChange={handleChecked}
            />
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
