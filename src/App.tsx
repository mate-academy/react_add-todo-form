import './App.scss';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoItem } from './types/TodoItem';

export const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  function getNextTodoId(): number {
    const maxId = Math.max(...todos.map((todo: TodoItem) => todo.id));

    return maxId + 1;
  }

  const addTodo = (todo: TodoItem) => {
    setTodos(currentTodos => [...currentTodos, todo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo({
      id: getNextTodoId(),
      title: title,
      completed: false,
      userId: userId,
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
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
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
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
