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
  const [isInputError, setIsInputError] = useState(false);
  const [isOptionError, setIsOptionError] = useState(false);

  const addTodo = (todo: Todo) => {
    setActualTodos([...actualTodos, todo]);
  };

  function getRandomDigits() {
    return Math.random()
      .toFixed(16)
      .slice(2);
  }

  const refresh = (event: React.FormEvent) => {
    event.preventDefault();

    if (!actualInput.trim()) {
      setIsInputError(true);
    } else {
      setIsInputError(false);
    }

    if (actualOption === 0) {
      setIsOptionError(true);
    } else {
      setIsOptionError(false);
    }

    if (actualInput.trim() && actualOption !== 0) {
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
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={refresh}>
        <div className="field">
          <label htmlFor="Title">Title: </label>
          <input
            id="Title"
            type="text"
            data-cy="titleInput"
            value={actualInput}
            onChange={event => setActualInput(event.target.value)}
            placeholder="Enter a title"
          />
          {
            isInputError
            && !actualInput.trim()
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label htmlFor="User">User: </label>
          <select
            id="User"
            data-cy="userSelect"
            value={actualOption}
            onChange={event => setActualOption(+event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(
              user => <option value={user.id}>{user.name}</option>,
            )}
          </select>

          {
            isOptionError
            && actualOption === 0
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onSubmit={refresh}
        >
          Add
        </button>
      </form>

      <TodoList todos={actualTodos} />
    </div>
  );
};
