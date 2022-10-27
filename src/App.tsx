import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setErrorUser(false);
  };

  const addUser = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = {
      id: maxId,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    if (title.trim() && userId) {
      todos.push(newTodo);
      setTitle('');
      setUserId(0);
    } else {
      setErrorTitle(title.trim() === '');
      setErrorUser(userId === 0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addUser}
      >
        <div className="field">
          <label>
            <span>Title: </span>

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>

          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            <span>User: </span>

            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUser}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </label>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
