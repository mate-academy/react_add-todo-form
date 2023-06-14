import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [stateTodos, setStateTodos] = useState(todos);
  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState('Choose');
  const [showErrorInput, setShowErrorInput] = useState(true);
  const [showErrorSelect, setShowErrorSelect] = useState(true);
  const handlerSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.target[0] as HTMLInputElement;
    const select = e.target[1] as HTMLSelectElement;

    const inputValue = input.value;
    const selectValue = +select.value;

    if (!inputValue || !selectValue) {
      setShowErrorInput(!!inputValue);
      setShowErrorSelect(!!selectValue);

      return;
    }

    setStateTodos([...stateTodos, {
      id: Math.random(),
      title: inputValue,
      completed: false,
      userId: selectValue,
      user: getUser(selectValue),
    }]);

    setTitleInput('');
    setUserSelect('Choose');
  };

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowErrorInput(true);
    setTitleInput(e.target.value);
  };

  const handlerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowErrorSelect(true);
    setUserSelect(e.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handlerSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            name="titleInput"
            value={titleInput}
            onChange={handlerInput}
          />
          <span
            className="error"
            hidden={showErrorInput}
          >
            Please enter a title
          </span>
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={userSelect}
            onChange={handlerSelect}
          >
            <option value="Choose" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          <span
            className="error"
            hidden={showErrorSelect}
          >
            Please choose a user
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={stateTodos} />
    </div>
  );
};
