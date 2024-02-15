import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [newTitle, setNewTitle] = useState('');
  const [selectUserId, setSelectUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [selectUserError, setSelectUserError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(!event.target.value.trim());
    setNewTitle(event.target.value);
  };

  const handleSelectUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserError(false);
    setSelectUserId(+event.target.value);
  };

  const reset = () => {
    setNewTitle('');
    setSelectUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!newTitle.trim());
    setSelectUserError(!selectUserId);

    if (!newTitle.trim() || !selectUserId) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title: newTitle.trim(),
      completed: false,
      userId: selectUserId,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    reset();
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
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={newTitle}
            onChange={handleTitle}
          />
          {titleError && !newTitle
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            onChange={handleSelectUserId}
            value={selectUserId}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectUserError && (
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
