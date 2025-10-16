import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { TodoWithUser } from './types/TodoWithUser';

function getUserById(userId: number) {
  const user = usersFromServer.find(us => us.id === userId);

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  return user;
}

export const initialTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError('Please enter a title');
    }

    if (userId === 0) {
      setUserError('Please choose a user');
    }

    if (!trimmedTitle || userId === 0) {
      return;
    }

    const newId = Math.max(0, ...todos.map(t => t.id)) + 1;

    const newTodo: TodoWithUser = {
      id: newId,
      title: trimmedTitle,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
              if (titleError) {
                setTitleError('');
              }
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              if (userError) {
                setUserError('');
              }
            }}
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

          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
