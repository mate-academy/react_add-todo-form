import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const maxCurrentTodosId = Math.max(...todos.map(todo => todo.id));

    addTodo({
      id: maxCurrentTodosId + 1,
      title,
      userId,
      completed: false,
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="lable" htmlFor="todo-lable">
            Title:
          </label>
          <input
            className={classNames('input', {
              'is-danger': hasTitleError,
            })}
            id="todo-lable"
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="lable" htmlFor="todo-user-id">
            User:
          </label>

          <div
            className={classNames('select', {
              'is-danger': hasUserIdError,
            })}
          >
            <select
              id="todo-user-id"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
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
