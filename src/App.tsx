import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const App = () => {
  // #region inputs
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯіІєЄїЇґҐ0-9\s]/g,
      '',
    );

    setTitle(sanitizedValue);
    setTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };
  // #endregion

  // #region todos
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([
    ...todosFromServer,
  ]);

  const addTodo = (todo: Todo) => {
    setCurrentTodos(todos => [...todos, todo]);
  };
  // #endregion

  // #region return function
  const clearInputs = () => {
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserIdError(false);
  };
  // #endregion

  // #region create id function
  const uniqueId = () => {
    const maxId = Math.max(...currentTodos.map(todo => todo.id));

    return maxId + 1;
  };
  // #endregion

  // #region add todo and check
  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const createTodo: Todo = {
      id: uniqueId(),
      title: title,
      completed: false,
      userId: userId,
    };

    addTodo(createTodo);

    clearInputs();
  };
  // #endregion

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="title">Title: </label>
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
          <label htmlFor="select">User:</label>
          <select
            data-cy="userSelect"
            id="select"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={currentTodos} />
    </div>
  );
};
