import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [newTodo, setNewTodo] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleApprove = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId === 0 || title.trim() === '') {
      setErrorTitle(title.trim() === '');
      setErrorUser(userId === 0);

      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    setNewTodo((currentTodo) => {
      return [
        ...currentTodo,
        {
          id: maxId + 1,
          title,
          userId,
          completed: false,
          user: getUser(userId),
        },
      ];
    });

    setTitle('');
    setUserId(0);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setErrorUser(false);
    setUserId(+(event.target.value));
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorTitle(false);
    setTitle(event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleApprove}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select">User: </label>
          <select
            id="select"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodo} />
    </div>
  );
};
