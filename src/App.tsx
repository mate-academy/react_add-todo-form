import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [list, setList] = useState(todos);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(0);
  const [inputError, setInputError] = useState(false);
  const [userError, setUserError] = useState(false);

  const clearFormFields = () => {
    setInput('');
    setUserId(0);
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.trim()) {
      setInputError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (!userError && !inputError) {
      const newTodo : Todo = {
        id: Math.floor(Math.random() * 100),
        userId: +userId,
        title: input,
        completed: false,
        user: getUser(+userId),
      };

      setList((prevState) => [...prevState, newTodo]);
      clearFormFields();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            value={input}
            onChange={event => {
              setInput(event.target.value.trim());
              setInputError(false);
            }}
          />

          <span
            className={`error ${!inputError && 'invisible'}`}
          >
            Please enter a title
          </span>
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            onChange={event => {
              setUserId(+event.target.value);
              setInputError(false);
            }}
          >
            <option value="0" selected disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          <span
            className={`error ${!userError && 'invisible'}`}
          >
            Please choose a user
          </span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={list} />
      </section>
    </div>
  );
};
