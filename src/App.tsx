import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './Types/Types';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [actualTodos, setActualTodos] = useState([...todos]);
  const [actualInput, setActualInput] = useState('');
  const [actualOption, setActualOption] = useState(0);
  const [inputError, setInputError] = useState(false);
  const [optionError, setOptionError] = useState(false);

  const addTodo = (todo: Todo) => {
    setActualTodos([...actualTodos, todo]);
  };

  function getRandomDigits() {
    return Math.random()
      .toFixed(16)
      .slice(2);
  }

  const refresh = (event: MouseEvent) => {
    event.preventDefault();

    if (!actualInput.trim()) {
      setInputError(true);
    } else {
      setInputError(false);
    }

    if (actualOption === 0) {
      setOptionError(true);
    } else {
      setOptionError(false);
    }

    if (inputError || optionError) {
      return;
    }

    const newTodo = {
      id: +getRandomDigits(),
      title: actualInput,
      completed: false,
      userId: +actualOption,
      user: getUserById(actualOption),
    };

    addTodo(newTodo);

    setActualInput('');
    setActualOption(0);
  };

  // const state = actualInput.trim() && actualOption !== 0;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            value={actualInput}
            onChange={event => setActualInput(event.target.value)}
            placeholder="Enter a title"
          />
          {inputError
            ? <span className="error">Please enter a title</span> : null}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={actualOption}
            onChange={event => setActualOption(+event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(
              user => <option value={user.id}>{user.name}</option>,
            )}
          </select>

          {optionError
            ? <span className="error">Please choose a user</span> : null }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => refresh(
            event,
          )}
          // disabled={!state}
        >
          Add
        </button>
      </form>

      <TodoList todos={actualTodos} />
    </div>
  );
};
