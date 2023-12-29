import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, SetTodos] = useState(todosFromServer);

  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [selectedUserError, setSelectedUserError] = useState(false);

  const handelTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(!event.target.value.trim());
    setNewTitle(event.target.value);
  };

  const handleSelectUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserError(false);
    setSelectedUserId(+event.target.value);
  };

  const reset = () => {
    setNewTitle('');
    setSelectedUserId(0);
  };

  const handelSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!newTitle.trim());
    setSelectedUserError(!selectedUserId);

    if (!newTitle.trim() || !selectedUserId) {
      return;
    }

    const newTodoId = Math.max(...todos.map((el) => el.id + 1));

    const newTodo = {
      id: newTodoId,
      title: newTitle,
      completed: false,
      userId: selectedUserId,
    };

    SetTodos((prevTodos => [...prevTodos, newTodo]));

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handelSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={handelTitle}
          />
          {titleError && !newTitle
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={selectedUserId}
            onChange={handleSelectUserId}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectedUserError && (
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
