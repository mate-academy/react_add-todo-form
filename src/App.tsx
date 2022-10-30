import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';

function getTodosWithUsers(): Todo[] {
  return todosFromServer.map(todo => {
    return {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    };
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState(getTodosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function handleTitleFormat(event: React.ChangeEvent<HTMLInputElement>) {
    const titleFormat = event.target.value.replace(/[^a-zа-я\s\d]/gi, '');

    setTitle(titleFormat);
    setTitleError(false);
  }

  function handleUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setUserError(false);
  }

  function checkError() {
    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }
  }

  function resetForm() {
    setTitle('');
    setUserId(0);
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !userId) {
      return checkError();
    }

    setTodos(
      [
        ...todos,
        {
          id: todos[todos.length - 1].id + 1,
          title,
          completed: false,
          userId,
          user: usersFromServer.find(user => user.id === userId),
        },
      ],
    );

    return resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleFormat}
            />
          </label>

          {titleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUser}
            >
              <option value="0" disabled selected>Choose a user</option>

              {usersFromServer.map(user => {
                return (
                  <option
                    value={user.id}
                    key={user.id}
                  >
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>

          {userError && (
            <span className="error">
              Please choose a user
            </span>
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
