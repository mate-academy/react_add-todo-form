import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import Users from './types/Users';
import TodosWithUsers from './types/TodosWithUsers';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [users] = useState<Users[]>(usersFromServer);
  const [todos, setTodos] = useState<TodosWithUsers[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) || null,
    })),
  );
  const [title, setTitle] = useState<string>("");
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const generateUniqueId = () => {
    return Math.max(...todos.map(todo => todo.id), 0) + 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: TodosWithUsers = {
      id: generateUniqueId(),
      title: title,
      completed: false,
      userId: userId!,
      user: users.find(user => user.id === userId) || null,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(undefined);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title" className="label">
            Title:{' '}
          </label>
          <input
            id="post-title"
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="title">User: </label>
          <select
            id="post-section"
            value={userId || ''}
            data-cy="userSelect"
            onChange={handleUserChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
