import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './type/Todo';

function getUserById(userId: number) {
  return usersFromServer.find((user) => user.id === userId) || null;
}

const initialTodo: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodo);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleResetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const addNewTodo = () => {
    const todoId: number = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodoCard: Todo = {
      id: todoId,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos((prevTodo) => [...prevTodo, newTodoCard]);

    handleResetForm();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (title && userId) {
      return addNewTodo();
    }

    return null;
  };

  return (
    <div className="App section box">
      <h1 className="title">Add todo form</h1>

      <form
        onSubmit={handleSubmit}
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <label htmlFor="title" className="label">
            {'Title: '}
            <input
              value={title}
              placeholder="Enter title"
              id="title"
              type="text"
              data-cy="titleInput"
              onChange={handleTitleChange}
              className="input is-small"
            />

          </label>

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="users" className="label">
            {'Users: '}
            <select
              id="users"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
              className="select is-small"
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasUserError && <p className="error">Please choose a user</p>}
        </div>

        <button type="submit" data-cy="submitButton" className="button">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />

    </div>
  );
};
