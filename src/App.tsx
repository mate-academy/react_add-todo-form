import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';

function usersIntoTodos(): Todo[] {
  return todosFromServer.map(todo => {
    return {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    };
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(usersIntoTodos());
  const [titleInput, setTitleInput] = useState('');
  const [userInput, setUserInput] = useState(0);
  const [userSelectError, setUserSelectError] = useState(false);
  const [titleSelectError, setTitleSelectError] = useState(false);

  function verify() {
    if (!userInput || !titleInput) {
      if (!userInput) {
        setUserSelectError(true);
      }

      if (!titleInput) {
        setTitleSelectError(true);
      }
    }

    return userInput && titleInput;
  }

  function resetInputs() {
    setUserInput(0);
    setTitleInput('');
  }

  function getNewIdForTodo() {
    let biggest = 0;

    todos.forEach(todo => {
      if (todo.id > biggest) {
        biggest = todo.id;
      }
    });

    return biggest + 1;
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!verify()) {
      return;
    }

    setTodos(
      [
        ...todos,
        {
          id: getNewIdForTodo(),
          title: titleInput,
          completed: false,
          userId: userInput,
          user: usersFromServer.find(user => user.id === userInput),
        },
      ],
    );

    resetInputs();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            onChange={(event) => {
              const clearTitle = event.target.value
                .replace(/[^a-zа-я\s\d]/gi, '');

              setTitleInput(clearTitle);
              setTitleSelectError(false);
            }}
            placeholder="Enter a title"
          />

          {titleSelectError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <select
            value={userInput}
            data-cy="userSelect"
            onChange={(event) => {
              setUserInput(+event.currentTarget.value);
              setUserSelectError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => {
              return (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>

          {userSelectError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
