import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { User, Todo } from './types/types';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [todos, setTodos] = useState(todosFromServer);
  const [users] = useState(usersFromServer); //setUsers

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const todosWithUsers = todos
    .map(todo => {
      const user = users.find(u => u.id === todo.userId);

      return user ? { ...todo, user } : null;
    })
    .filter((todo): todo is Todo & { user: User } => todo !== null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;
    const currentUser = users.find(user => user.id === userId);

    if (!currentUser) {
      return;
    }

    const newTodo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
    };

    setTodos(prevTodos => [newTodo, ...prevTodos]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userInput">User</label>
          <select
            id="userInput"
            data-cy="userSelect"
            value={userId}
            required
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
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
      <TodoList todos={todosWithUsers} />
    </div>
  );
};
