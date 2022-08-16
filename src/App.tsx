import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (id: number) => (
  usersFromServer.find(user => user.id === id) || null
);

const getTodosWithUser = (todos: Todo[]) => {
  return todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
};

const todosWithUser = getTodosWithUser(todosFromServer);

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(todosWithUser);

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserValid, setIsUserValid] = useState(true);

  const clearInputs = () => {
    setTitle('');
    setUserId(0);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const maxId = Math.max(...todos.map(todo => todo.id));

    if (!title) {
      setIsTitleValid(false);
    }

    if (!userId) {
      setIsUserValid(false);
    }

    if (!title || !userId) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: maxId + 1,
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      },
    ]);

    clearInputs();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={
              (event) => {
                setTitle(event.target.value);
                setIsTitleValid(true);
              }
            }
          />
          {!isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={userId}
            onChange={
              (event => {
                setUserId(Number(event.target.value));
                setIsUserValid(true);
              })
            }
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!isUserValid && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
