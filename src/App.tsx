import React, { useState } from 'react';
import classNames from 'classnames';

import './App.scss';
import 'bulma/css/bulma.css';

import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosInitial: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNextTodoId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(todosInitial);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const addNewTodo = (): void => {
    const newTodo: Todo = {
      id: getNextTodoId(todos),
      userId,
      title,
      completed: false,
      user: getUserById(userId),
    };

    setTodos((prevTodos) => [
      ...prevTodos,
      newTodo,
    ]);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (title && userId) {
      addNewTodo();

      setTitle('');
      setUserId(0);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newString } = event.target;

    setTitle(newString.replace(/[^0-9a-zа-яіїєґ\s]/gi, ''));
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserIdError(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <div className="control">
              <label
                htmlFor="todoTitle"
                className="label"
              >
                {'Title: '}
                <input
                  type="text"
                  name="title"
                  className={classNames(
                    'input',
                    {
                      'is-danger': hasTitleError,
                    },
                  )}
                  id="todoTitle"
                  placeholder="Enter a title"
                  data-cy="titleInput"
                  value={title}
                  onChange={handleTitleChange}
                />
              </label>
            </div>
            {hasTitleError && (
              <p className="help is-danger error">
                Please enter a title
              </p>
            )}
          </div>

          <div className="field">
            <label
              htmlFor="todoUser"
              className="label"
            >
              {'User: '}
            </label>
            <div className="control">
              <div className={classNames(
                'select',
                {
                  'is-danger': hasUserIdError,
                },
              )}
              >
                <select
                  id="todoUser"
                  data-cy="userSelect"
                  value={userId}
                  onChange={handleUserIdChange}
                >
                  <option value="0" disabled>Choose a user</option>
                  {usersFromServer.map(user => (
                    <option
                      value={user.id}
                      key={user.id}
                    >
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {hasUserIdError && (
              <p className="help is-danger error">
                Please choose a user
              </p>
            )}
          </div>

          <div className="field">
            <button
              type="submit"
              data-cy="submitButton"
              className="button is-primary"
            >
              Add
            </button>
          </div>

          <div className="is-divider" />
        </form>

        <TodoList todos={todos} />
      </div>
    </div>
  );
};
