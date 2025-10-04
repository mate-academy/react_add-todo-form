import './App.scss';

import usersFromServer from './api/users';
// import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  // const [todos, setTodos] = useState([...todosFromServer]);
  const [selectValue, setSelectValue] = useState(0);
  const handleInput = (valueToSet: string) => {
    setInputValue(valueToSet);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            onChange={event => handleInput(event.target.value)}
            value={inputValue}
            type="text"
            data-cy="titleInput"
          />
          {!inputValue && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectValue}
            onChange={event => setSelectValue(event.target.value)}
          >
            <option value={'0'} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name};
              </option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList getUser={getUserById} todos={todos}></TodoList>
      </section>
    </div>
  );
};
