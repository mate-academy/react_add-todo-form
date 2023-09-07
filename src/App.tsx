import React, { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { PreparedTodo } from './types/Todo';

const preparedTodos: PreparedTodo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(({ id }) => id === todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState(preparedTodos);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setHasTitleError(false);
  }

  function handleUserIdSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  }

  function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = usersFromServer.find(({ id }) => id === userId);
    const todoIds = todos.map(({ id }) => id);
    const maxId = Math.max(...todoIds);

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId,
      user,
    };

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleAdd}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleUserIdSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ name, id }) => {
              return (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              );
            })}
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
