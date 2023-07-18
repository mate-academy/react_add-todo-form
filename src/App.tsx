import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { User } from './types/User';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

function findUser(id: number):User | null {
  return usersFromServer.find(user => user.id === id)
    || null;
}

const initialTodos:Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const [newTitle, setNewTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [newUser, setNewUser] = useState(0);
  const [userError, setUserError] = useState(false);

  function reset() {
    setNewTitle('');
    setNewUser(0);
    setTitleError(false);
    setUserError(false);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const regex = /^(?=.*[a-zA-Zа-яА-ЯёЁ0-9])[\w\s]*$/;

    if (regex.test(event.target.value)) {
      setNewTitle(event.target.value);
    }

    setTitleError(false);
  }

  function handleUserInput(event: React.ChangeEvent<HTMLSelectElement>) {
    setNewUser(+event.target.value);
    setUserError(false);
  }

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    setUserError(!newUser);
    setTitleError(!newTitle);

    if (!newTitle || !newUser) {
      return;
    }

    setTodos(previousTodos => (
      [...previousTodos,
        {
          id: Math.max(...todos.map(todo => todo.id)) + 1,
          title: newTitle,
          completed: false,
          userId: newUser,
          user: findUser(newUser),
        },
      ]
    ));

    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={newTitle}
            onChange={handleTitleChange}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            data-cy="userSelect"
            id="user"
            value={newUser}
            onChange={handleUserInput}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
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
