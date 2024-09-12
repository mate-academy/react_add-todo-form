import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/user';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasSelectError, setSelectError] = useState(false);
  const [title, setTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);
  const cleanTitle = (str: string) => {
    return str.replaceAll(/[^\w\d\sа-яїієґА-ЯЇІЄҐ]/g, '');
  };

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setSelectError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(cleanTitle(event.target.value));
    setTitleError(false);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setSelectError(!selectedUser);

    if (!title.trim() || !selectedUser) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: maxId + 1,
        title,
        completed: false,
        userId: selectedUser,
      },
    ]);
    setTitle('');
    setSelectedUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            name="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelection}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasSelectError && (
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
