import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  const normalizedTodos = todosFromServer.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId);

    if (!user) {
      throw new Error(`User not found for todo ${todo.id}`);
    }

    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      user,
    };
  });

  const [todos, setTodos] = useState(normalizedTodos);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userSelect, setUserSelect] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleErrors = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasTitleError(!title);
    setHasUserError(!userSelect);

    if (!title || !userSelect) {
      return;
    }

    const foundUser = usersFromServer.find(u => u.id === userSelect);

    if (!foundUser) {
      return;
    }

    const maxId = Math.max(0, ...todos.map(t => t.id));

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      user: foundUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserSelect(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleErrors}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={(e) => {
              setTitle(e.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userSelect}
            onChange={(e) => {
              setUserSelect(Number(e.target.value));
              setHasUserError(false);
            }}
          >
            <option value={0} disabled>
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

      <TodoList users={usersFromServer} todos={todos} />
    </div>
  );
};
