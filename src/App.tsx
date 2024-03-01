import './App.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) as User,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const getNewTodoId = () => {
    const maxId = Math.max(...initialTodos.map(todo => todo.id));

    return maxId + 1;
  };

  const addTodos = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    addTodos({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId) as User,
    });
  };

  return (
    <div className="App section">
      <h1 className="title">Add todo form</h1>

      <form
        className="box"
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label" htmlFor="title">
            Title
          </label>
          <div className="control has-icons-right">
            <input
              className={classNames('input', { 'is-danger': hasTitleError })}
              type="text"
              id="title"
              data-cy="titleInput"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
            />
            {hasTitleError && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>
          {hasTitleError && (
            <span className="error help is-danger">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            User
          </label>
          <div className="control has-icons-left">
            <div
              className={classNames('select', {
                'is-danger': hasUserIdError,
              })}
            >
              <select
                data-cy="userSelect"
                id="user"
                value={userId}
                onChange={handleUserChange}
              >
                <option value="0" disabled>
                  Choose a user
                </option>
                {usersFromServer.map(user => (
                  <option value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
          </div>
          {hasUserIdError && (
            <span className="error help is-danger">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" className="button is-link">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
