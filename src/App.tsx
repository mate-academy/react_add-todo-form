import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';

function TodosWithUsers(): Todo[] {
  return todosFromServer.map(todo => {
    return {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    };
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState(TodosWithUsers);
  const [titleInput, setTitleInput] = useState('');
  const [userChoose, setUserChoose] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function errorCheck() {
    if (!titleInput || !userChoose) {
      if (!titleInput) {
        setTitleError(true);
      }

      if (!userChoose) {
        setUserError(true);
      }
    }

    return titleInput && userChoose;
  }

  function inputsToDefault() {
    setTitleInput('');
    setUserChoose(0);
  }

  function maxId() {
    let maxNumber = 0;

    todos.forEach(todo => {
      if (todo.id > maxNumber) {
        maxNumber = todo.id;
      }
    });

    return maxNumber + 1;
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!errorCheck()) {
      return;
    }

    setTodos(
      [
        ...todos,
        {
          id: maxId(),
          title: titleInput,
          completed: false,
          userId: userChoose,
          user: usersFromServer.find(user => user.id === userChoose),
        },
      ],
    );

    inputsToDefault();
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
              value={titleInput}
              onChange={(event) => {
                const titleFormat = event.target.value
                  .replace(/[^a-zа-я\s\d]/gi, '');

                setTitleInput(titleFormat);
                setTitleError(false);
              }}
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
              value={userChoose}
              onChange={(event) => {
                setUserChoose(+event.target.value);
                setUserError(false);
              }}
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
