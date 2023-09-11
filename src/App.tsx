import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/Todos';
import User from './types/User';

const preparedTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.id) || null,
} as TodoWithUser));

function findUserById(userId: number): User {
  return usersFromServer.find(({ id }) => userId === id) as User;
}

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const addButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isError = false;

    if (title === '') {
      setTitleError(true);
      isError = true;
    }

    if (userId === 0) {
      setUserIdError(true);
      isError = true;
    }

    if (isError) {
      return;
    }

    reset();

    const todoWithId = todos.map(({ id }) => id);
    const maxTodoId = Math.max(...todoWithId);

    const newTodo: TodoWithUser = {
      id: maxTodoId + 1,
      title,
      completed: false,
      userId,
      user: findUserById(userId),
    };

    setTodos([...todos, newTodo]);

    reset();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={addButton}
        noValidate
      >
        <div className="field">
          <label
            htmlFor="title"
          >
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userID">
            User:
          </label>
          <select
            id="userID"
            data-cy="userSelect"
            value={userId}
            onChange={selectUser}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && (
            <span className="error">Please choose a user</span>
          )}
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
