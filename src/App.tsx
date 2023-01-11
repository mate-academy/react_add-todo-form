import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [titleErr, setTitleErr] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userErr, setUserErr] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleErr(true);
    }

    if (!userId) {
      setUserErr(true);
    }

    if (title.length > 0 && userId !== 0) {
      const newTodo = {
        id: todos.length + 1,
        title,
        completed: false,
        userId,
      };

      setTodos(array => [
        ...array,
        newTodo,
      ]);

      setTitle('');
      setUserId(0);
      setTitleErr(false);
      setUserErr(false);
    }
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
          <label htmlFor="title">
            {'Title: '}

            <input
              type="text"
              name="tilte"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
          </label>

          {(titleErr && title.length === 0) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            {'User: '}

            <select
              data-cy="userSelect"
              name="user"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

          </label>

          {(userErr && userId === 0) && (
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
