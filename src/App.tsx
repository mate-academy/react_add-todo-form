import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { getUserById } from './services/User';
import { getNewId, filterTitle } from './services/Todo';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const defaultTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(defaultTodos);
  const [title, setTitle] = useState({ value: '', hasError: false });
  const [user, setUser] = useState({ id: 0, hasError: false });

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const clearForm = () => {
    setTitle({ value: '', hasError: false });
    setUser({ id: 0, hasError: false });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.value) {
      setTitle((prevTitle) => ({ ...prevTitle, hasError: true }));
    }

    if (user.id === 0) {
      setUser((prevUser) => ({ ...prevUser, hasError: true }));
    }

    if (!title.value || user.id === 0) {
      return;
    }

    addTodo({
      id: getNewId(todos),
      title: filterTitle(title.value),
      completed: false,
      userId: user.id,
      user: getUserById(usersFromServer, user.id),
    });

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              className="App__input"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title.value}
              onChange={
                (e) => setTitle({ value: e.target.value, hasError: false })
              }
            />
          </label>

          {title.hasError
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            className="App__input"
            data-cy="userSelect"
            value={user.id}
            onChange={e => setUser({ id: +e.target.value, hasError: false })}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(currentUser => (
              <option value={currentUser.id}>{currentUser.name}</option>
            ))}
          </select>

          {user.hasError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
