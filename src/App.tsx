import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function getUser(userId: number) {
  const findUser = usersFromServer.find(user => user.id === userId);

  return findUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [allTodos, setAllTodos] = useState(todos);

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement>
    = (event) => {
      event.preventDefault();

      setTitleErrorMessage('');

      return setTitle(event.target.value);
    };

  const handleUserChange: React.ChangeEventHandler<HTMLSelectElement>
    = (event) => {
      event.preventDefault();

      setUserErrorMessage('');

      return setUserId(+event.target.value);
    };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    if (!title) {
      setTitleErrorMessage('Please enter a title');
    }

    if (userId === 0) {
      setUserErrorMessage('Please choose a user');
    }

    const findId = Math.max(...allTodos.map(todo => todo.id));

    const todo: Todo = {
      id: (findId + 1),
      title,
      userId: +userId,
      completed: false,
      user: getUser(+userId),
    };

    if (title && userId !== 0) {
      setAllTodos([...todos, todo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />

          <span className="error">
            {titleErrorMessage}
          </span>
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            onChange={handleUserChange}
            value={userId}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">{userErrorMessage}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
