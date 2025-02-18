import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import React, { useState } from 'react';
import todosFromServer from './api/todos';

export const App = () => {
  const [option, setOption] = useState('0');
  const [optionHasError, setOptionHasError] = useState(false);

  const [title, setTitle] = useState('');
  const [titleHasError, setTitleHasError] = useState(false);

  const [todos, setTodos] = useState([...todosFromServer]);
  const newID = () => {
    let maxID = -Infinity;

    for (const { id } of todos) {
      if (maxID < id) {
        maxID = id;
      }
    }

    return maxID + 1;
  };

  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = event => {
    setTitle(event.target.value);
    setTitleHasError(false);
  };

  const selectHandler: React.ChangeEventHandler<HTMLSelectElement> = event => {
    setOption(event.target.value);
    setOptionHasError(false);
  };

  const resetForm = () => {
    setOption('0');
    setTitle('');
  };

  const validateSubmit = () => {
    if (!title.trim()) {
      setTitleHasError(true);
    }

    if (option === '0') {
      setOptionHasError(true);
    }
  };

  const submitHandler: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault();

    if (!title.trim() || option === '0') {
      validateSubmit();

      return;
    }

    if (!optionHasError && !titleHasError) {
      setTodos([
        ...todos,
        {
          id: newID(),
          title: title,
          completed: false,
          userId: +option,
        },
      ]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={inputHandler}
          />
          {titleHasError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            name="user"
            data-cy="userSelect"
            value={option}
            onChange={selectHandler}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>

          {optionHasError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" onClick={submitHandler}>
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
