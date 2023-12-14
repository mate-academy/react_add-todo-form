import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todos } from './components/Type/Todos';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const todosWithUser: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos[]>(todosWithUser);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const addTodos = (newTodos: Todos) => {
    setTodos(prev => [...prev, newTodos]);
  };

  const handlerTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handlerUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handlerAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() && userId) {
      addTodos({
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      });
      setTitle('');
      setUserId(0);
    }

    setTitleError(!title.trim());
    setUserIdError(!userId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handlerAdd}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handlerTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handlerUserIdChange}
          >
            <option
              disabled
              value={0}
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
