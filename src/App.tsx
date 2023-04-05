import './App.scss';
import React, { useState } from 'react';
import { User, Todo } from './types/types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

const initialTodos = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setErrorTitle(false);
  };

  const resetFields = () => {
    setTitle('');

    setErrorUser(false);
    setSelectedUserId(0);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setErrorUser(false);
    setSelectedUserId(+value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorTitle(true);
    }

    if (!selectedUserId) {
      setErrorUser(true);
    }

    setTitle(title.replace(/[^A-Za-z\s\d\u0400-\u04FF]/g, ''));

    if (title.trim() && selectedUserId) {
      const newTodo: Todo = {
        id: Math.max(...todos.map((todo) => todo.id)) + 1,
        userId: selectedUserId,
        title,
        completed: false,
        user: getUserById(selectedUserId),
      };

      setTodos((prevTodo => [...prevTodo, newTodo]));

      resetFields();
    }
  };

  return (
    <div className="containerForApp">
      <div className="App">
        <h1 className="title">
          Add todo form
        </h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={handleSubmit}
          className="formUsers"
        >
          <div className="field">
            <label
              htmlFor="titleInput"
            >
              Title
              <input
                type="text"
                className="field-form"
                data-cy="titleInput"
                value={title}
                onChange={handleChangeTitle}
                placeholder="Enter a title"
              />
            </label>

            {errorTitle && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </div>

          <div className="field">
            <label
              htmlFor="userSelect"
              className="labelUser"
            >
              User
              <select
                data-cy="userSelect"
                id="userSelect"
                placeholder="Choose a user"
                className="selectorUsers"
                value={selectedUserId}
                onChange={handleUserId}
              >
                <option value="0">
                  Choose a user
                </option>

                {usersFromServer.map(({ name, id }) => (
                  <option
                    value={id}
                    key={id}
                  >
                    {name}
                  </option>
                ))}
              </select>
            </label>

            {errorUser && (
              <span className="error">
                Please choose a user
              </span>
            )}
          </div>

          <button
            type="submit"
            data-cy="submitButton"
            className="submit-button"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    </div>
  );
};
