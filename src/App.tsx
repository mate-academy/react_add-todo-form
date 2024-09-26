import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [todos, setTodos] = useState(todosFromServer);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    const createId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: createId,
      title: title.trim(),
      completed: false,
      userId: selectedUserId,
    };

    setTodos(prevTodo => [...prevTodo, newTodo]);
    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Type your title here..."
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={selectedUserId}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
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
