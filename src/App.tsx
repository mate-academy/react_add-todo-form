import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

const titlePattern = /^[a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9 ]+$/;

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState('');
  const [hasUserIdError, setHasUserIdError] = useState('');

  const maxId = Math.max(...todos.map(todo => todo.id));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const titleError = !title.trim()
      ? 'Please enter a title'
      : !titlePattern.test(title)
        ? 'Title can contain only letters, digits, and spaces'
        : '';
    const userError = userId === 0 ? 'Please choose a user' : '';

    setHasTitleError(titleError);
    setHasUserIdError(userError);

    if (titleError || userError) {
      return;
    }

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId,
      user: usersFromServer.find(user => user.id === userId) || null,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="post-title">Title: </label>
          <input
            placeholder="enter a title"
            value={title}
            id="post-title"
            type="text"
            data-cy="titleInput"
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError('');
            }}
          />
          {hasTitleError && <span className="error">{hasTitleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="post-userSelect">User: </label>
          <select
            className="select-user"
            id="post-userSelect"
            data-cy="userSelect"
            defaultValue={0}
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setHasUserIdError('');
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

          {hasUserIdError && <span className="error">{hasUserIdError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
