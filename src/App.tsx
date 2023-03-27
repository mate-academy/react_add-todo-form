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

let nextTodoId = Math.max(...todosInitial.map(todo => todo.id)) + 1;

export const App = () => {
  const [todos, setTodos] = useState(todosInitial);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [isTitleErrorShown, setIsTitleErrorShown] = useState(false);
  const [isUserIdErrorShown, setIsUserIdErrorShown] = useState(false);

  const validateFields = (): boolean => {
    let isFieldsValid = true;

    if (!title) {
      isFieldsValid = false;
      setIsTitleErrorShown(true);
    }

    if (!userId) {
      isFieldsValid = false;
      setIsUserIdErrorShown(true);
    }

    return isFieldsValid;
  };

  const addNewTodo = (): void => {
    const newTodo: Todo = {
      id: nextTodoId,
      userId,
      title,
      completed: false,
      user: getUserById(userId),
    };

    setTodos((prevTodos) => [
      ...prevTodos,
      newTodo,
    ]);

    nextTodoId += 1;
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const isEachFieldValid = validateFields();

    if (isEachFieldValid) {
      addNewTodo();

      setTitle('');
      setUserId(0);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newString } = event.target;

    setTitle(newString.replace(/[^0-9a-zа-яіїєґ\s]/gi, ''));
    setIsTitleErrorShown(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsUserIdErrorShown(false);
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
                      'is-danger': isTitleErrorShown,
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
            {isTitleErrorShown && (
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
                  'is-danger': isUserIdErrorShown,
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
            {isUserIdErrorShown && (
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
