import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App:React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }

    if (title.trim() && userId !== 0) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        userId,
        title,
        completed: false,
        user: getUser(userId),
      };

      setTodos((previousTodo: Todo[]) => {
        return [...previousTodo, newTodo];
      });

      setTitle('');
      setUserId(0);

      setTitleError(false);
      setUserError(false);
    }
  };

  const handleTitle = (
    event: { target: { value: string; }; },
  ) => {
    setTitle(event.target.value.replace(/[^a-zA-Z0-9\sU+0430-яєії]/ig, ''));
    setTitleError(false);
  };

  const handleUserName = (event: { target: { value: string | number; }; }) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:

            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserName}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userError && (
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
