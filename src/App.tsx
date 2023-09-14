import React, { useState } from 'react';

import './App.scss';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/TodoWithUser';
import { regexForTodoTitle } from './utils';

const preparedTodos: TodoWithUser [] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => todo.userId === id) || null,
}));

export const App: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<TodoWithUser[]>(preparedTodos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);

  const newTodoUser = usersFromServer.find(({ id }) => id === userId);

  const maxId = Math.max(...todos.map(todo => todo.id));

  const newTodo = {
    id: maxId + 1,
    title: todoTitle,
    userId,
    completed: false,
    user: newTodoUser || null,
  };

  const handleTitleChange
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value.replace(regexForTodoTitle, ''));
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectError(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle && userId) {
      setTodos((prevState => [...prevState, newTodo]));
      setTodoTitle('');
      setUserId(0);
    }

    setHasTitleError(!todoTitle);
    setHasSelectError(!userId);
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
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={handleTitleChange}
          />

          {hasTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            value={userId}
            data-cy="userSelect"
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {hasSelectError && (
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
