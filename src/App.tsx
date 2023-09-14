import React, { useState } from 'react';

import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getNewTodoId, getUserById } from './helper';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const invalidSymbols = /[^a-zA-Za-åa-ö-w-я 0-9/ .,]/gi;
    const normalizedValue = event.target.value.replaceAll(invalidSymbols, '');

    setTitle(normalizedValue);
    setTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    addTodo({
      id: getNewTodoId(todos),
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
          </label>

          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
          </label>

          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
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
