// #region IMPORTS
import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
// #endregion

function getUserById(id: number): User {
  return usersFromServer.find(user => user.id === id) as User;
}

const prepareList = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [preparedList, setPreparedList] = useState(prepareList);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [isUserError, setIsUserError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // const userError = userId === 0 && isUserSelected;

  function getNewTodoId() {
    const currentMax = Math.max(...preparedList.map(todo => todo.id));

    return currentMax + 1;
  }

  function handleSubmitNewTodo(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      setTitle('');
      setTitleError(true);
    }

    if (userId === 0) {
      setIsUserError(true);
    }

    if (!title.trim() || userId === 0) {
      return;
    }

    if (userId && title.trim()) {
      setPreparedList([
        ...preparedList,
        {
          id: getNewTodoId(),
          title,
          completed: isCompleted,
          userId,
          user: getUserById(userId),
        }]);
      setTitle('');
      setUserId(0);
      setIsUserError(false);
      setIsCompleted(false);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmitNewTodo}
      >
        <div className="field">
          <label htmlFor="">
            Write your Todo task in the field
            <input
              type="text"
              data-cy="titleInput"
              className={classNames('input', {
                'is-danger': titleError,
              })}
              placeholder="type here"
              value={title}
              onChange={event => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
            {titleError && (
              <span className="error">
                {/* eslint-disable-next-line @typescript-eslint/quotes */}
                {` Please enter a title`}
              </span>
            )}
          </label>
        </div>

        <br />

        <div className="field">
          <label htmlFor="user-id"> Select user: </label>
          <select
            id="user-id"
            value={userId}
            data-cy="userSelect"
            required
            onChange={(event) => {
              setUserId(+event.target.value);
              setIsUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <br />

        <div className="field">
          <label htmlFor="">
            Is your task completed?
            <input
              type="checkbox"
              onChange={() => setIsCompleted(!isCompleted)}
              checked={isCompleted}
            />
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <hr />

      <TodoList todos={preparedList} />

    </div>
  );
};
