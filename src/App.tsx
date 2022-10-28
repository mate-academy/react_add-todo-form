import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser, User } from './react-app-env';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const getTodoId = (todos: TodoWithUser[]) => {
  const maxTodoId = Math.max(...todos.map(todo => todo.id));

  return maxTodoId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);
  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [todoUserId, setTodoUserId] = useState(0);
  const [hasUserIdError, setUserIdError] = useState(false);

  const resetForm = () => {
    setTodoTitle('');
    setTodoUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimTitle = todoTitle.trim();

    setTitleError(!trimTitle);
    setUserIdError(!todoUserId);

    if (!trimTitle || !todoUserId) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: getTodoId(todos),
      title: todoTitle,
      completed: false,
      userId: todoUserId,
      user: getUser(todoUserId),
    };

    if (!hasTitleError && !hasUserIdError) {
      setTodos(currTodos => [...currTodos, newTodo]);
      resetForm();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>
        Add todo form
      </h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleInput}
          />

          {hasTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={todoUserId}
            onChange={handleSelect}
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
            <span className="error">
              Please choose a user
            </span>
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
