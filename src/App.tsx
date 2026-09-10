import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanTitle = event.target.value.replace(
      /[^a-zA-Zа-щЬьЄєЮюЯяЇїІіҐґ0-9 ]/g,
      '',
    );

    setTitle(cleanTitle);

    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));

    if (hasUserError) {
      setHasUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleValid = title.trim().length > 0;
    const isUserValid = userId !== 0;

    setHasTitleError(!isTitleValid);
    setHasUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId);
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
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

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
