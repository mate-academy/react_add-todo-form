import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [selectedName, setSelectedName] = useState('');
  const [customInput, setcustomInput] = useState('');

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedName(event.currentTarget.value);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setcustomInput(event.currentTarget.value);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="User">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            title="User"
            value={customInput}
            onChange={handleTitleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="name">User: </label>
          <select
            data-cy="userSelect"
            name="name"
            value={selectedName}
            onChange={handleUserChange}

          >
            <option value="0" selected>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>))}
          </select>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList />
    </div>
  );
};
