import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number) => usersFromServer
  .find(user => user.id === userId)
  || null;

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const createNewTodo = () => {
    const maxId = Math.max(...visibleTodos.map(todo => todo.id));

    return {
      id: maxId + 1,
      title,
      completed: false,
      userId: Number(selectedUser),
      user: getUserById(Number(selectedUser)),
    };
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!selectedUser);

    if (title && selectedUser) {
      const newTodo = createNewTodo();

      setVisibleTodos([
        ...visibleTodos,
        newTodo,
      ]);

      setTitle('');
      setSelectedUser('');
    }
  };

  const handleTitleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Z0-9 ]/g, ''));
    setTitleError(false);
  };

  const handleUserChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            {'Title: '}
            <input
              type="text"
              id="title"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
          </label>

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
