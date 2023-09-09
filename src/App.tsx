import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './components/types/User';
import { TodoWithUser } from './components/types/Todo';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.userId) || null,
} as TodoWithUser));

function findUserById(userId: number): User {
  return usersFromServer.find(({ id }) => id === userId) as User;
}

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleBtAdd = (event: React.FormEvent<HTMLFormElement>) => {
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

    function resetForm() {
      setTitle('');
      setUserId(0);
    }

    const todoIds = todos.map(({ id }) => id);
    const maxTodoId = Math.max(...todoIds);

    const newTodo: TodoWithUser = {
      id: maxTodoId + 1,
      title,
      completed: false,
      userId,
      user: findUserById(userId),
    };

    setTodos([...todos, newTodo]);

    resetForm();
  };

  const handleSelectUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        noValidate
        onSubmit={handleBtAdd}
      >
        <div className="field">
          <label
            htmlFor="title"
          >
            Title:
          </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            required
            placeholder="Enter a title"
          />
          {titleError && (
            <span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label
            htmlFor="user-id"
          >
            User:
          </label>

          <select
            id="user-id"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectUserId}
            required
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option
                key={`${user.name}_user.name`}
                value={user.id}
              >
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
