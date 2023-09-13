import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser, User } from './types';
import { TodoList } from './components/TodoList';

function findUserById(users: User[], userId: number): User | null {
  return users.find((user) => user.id === userId) || null;
}

const preparedTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(usersFromServer, todo.userId),
}));

export const App: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState<TodoWithUser[]>(preparedTodos);

  const resetForm = () => {
    setTodoTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoTitle(event.target.value);
    setHasTitleError(false);
  }

  function handleUserIdChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasTitleError(!todoTitle);
    setHasUserIdError(!userId);

    if (!todoTitle || !userId) {
      return;
    }

    const user = findUserById(usersFromServer, userId);

    const todosIds = todos.map(({ id }) => id);
    const maxTodoId = Math.max(...todosIds);

    const newTodo = {
      id: maxTodoId + 1,
      title: todoTitle,
      completed: false,
      userId,
      user,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    resetForm();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleTitleChange}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
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

          {hasUserIdError && (
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
