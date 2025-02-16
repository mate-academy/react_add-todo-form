import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [newId, setNewId] = useState(
    Math.max(...todos.map(todo => todo.id), 0) + 1,
  );

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUserId, setErrorUserId] = useState(false);

  const invalidTitle = title.trim() === '';
  const invalidUserId = userId === 0;

  const addNewTodo = () => {
    const newTodo = {
      id: newId,
      title,
      completed: false,
      userId,
    };

    setTodos([...todos, newTodo]);
    setNewId(newId + 1);
  };

  const clearFields = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorTitle(invalidTitle);
    setErrorUserId(invalidUserId);

    if (invalidTitle || invalidUserId) {
      return;
    }

    addNewTodo();
    clearFields();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={e => handleSubmit(e)}>
        <div className="field">
          <label htmlFor="title">Enter with a title </label>
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="A new title to be submit"
            value={title}
            onChange={e => {
              const value = e.target.value;

              setTitle(value.trim());
              setErrorTitle(value.trim() === '');
            }}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSeleted">Select a user </label>
          <select
            name="userSeleted"
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              const value = +e.target.value;

              setUserId(value);
              setErrorUserId(value === 0);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(userFromServer => (
              <option key={userFromServer.id} value={userFromServer.id}>
                {userFromServer.name}
              </option>
            ))}
          </select>

          {errorUserId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
