import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState('');
  const [userIdError, setUserIdError] = useState(false);

  const todosWithUsers = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(userItem => userItem.id === todo.userId),
  }));
  const [todos, setTodos] = useState(todosWithUsers);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;
    const userNumberId = Number(userId);
    const user = usersFromServer.find(userItem => userItem.id === userNumberId);
    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('');
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setTitleError(false);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(event.target.value);
    setUserIdError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            name="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <label htmlFor="userSelect">User</label>
        <div className="field">
          <select
            id="userSelect"
            name="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(userFromServer => (
              <option key={userFromServer.id} value={userFromServer.id}>
                {userFromServer.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
