import './App.scss';
import { useState } from 'react';
import React from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    })),
  );

  const getUser = (userId: number) => {
    return usersFromServer.find(user => user.id === userId);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (!title.trim() || !selectedUser) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: title.trim(),
      userId: Number(selectedUser),
      completed: false,
      user: getUser(Number(selectedUser)),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUser('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-title">User:</label>
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
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
