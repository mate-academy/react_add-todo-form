import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser, User } from './types';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const initTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoTitleError, setTodoTitleError] = useState(false);
  const [todoUserId, setTodoUserId] = useState(0);
  const [todoUserIdError, setTodoUserIdError] = useState(false);
  const [todos, setTodos] = useState(initTodos);

  function resetForm() {
    setTodoUserId(0);
    setTodoTitle('');
  }

  function handleOnAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!todoTitle) {
      setTodoTitleError(true);
    }

    if (!todoUserId) {
      setTodoUserIdError(true);
    }

    if (!todoTitle || !todoUserId) {
      return;
    }

    const todosIds = todos.map(({ id }) => id);
    const maxTodosId = Math.max(...todosIds);
    const newTodo = {
      id: maxTodosId + 1,
      title: todoTitle,
      completed: false,
      userId: todoUserId,
      user: getUserById(todoUserId),
    };

    setTodos((prevState) => [...prevState, newTodo]);
    resetForm();
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoTitleError(false);
    setTodoTitle(event.target.value);
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTodoUserIdError(false);
    setTodoUserId(+event.target.value);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleOnAdd}
      >
        <div className="field">
          <label htmlFor="TitleLabel">Title: </label>
          <input
            type="text"
            id="TitleLabel"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleTitleChange}
          />
          {todoTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="UserLabel">User: </label>
          <select
            data-cy="userSelect"
            id="UserLabel"
            value={todoUserId}
            onChange={handleUserChange}
          >
            <option
              value={0}
              disabled
              selected
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {todoUserIdError && (
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
