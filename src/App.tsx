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
  const [userId, setUserId] = useState(0);
  const [touched, setTouched] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const titleError = !title && touched;

  const userError = userId === 0 && isUserSelected;

  function getNewTodoId() {
    const currentMax = Math.max(...preparedList.map(todo => todo.id));

    return currentMax + 1;
  }

  function handleSubmitNewTodo(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      setTitle('');
      setTouched(true);
    }

    if (userId === 0) {
      setIsUserSelected(true);
    }

    if (!title.trim() || userId === 0) {
      return;
    }

    if (isUserSelected && title.trim()) {
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
      setIsCompleted(false);
      setTouched(false);
      setIsUserSelected(false);
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
              onChange={event => setTitle(event.target.value)}
              onBlur={() => setTouched(true)}
            // required
            />
            {titleError && (
              <span className="error">
                {/* eslint-disable-next-line @typescript-eslint/quotes */}
                {` - type your title, please`}
              </span>
            )}
          </label>
        </div>

        <br />

        <div className="field">
          <label htmlFor="user-id"> Select user: </label>
          <select
            id="user-id"
            data-cy="userSelect"
            defaultValue={userId}
            required
            onChange={(event) => {
              setUserId(+event.target.value);
              setIsUserSelected(true);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && (
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
