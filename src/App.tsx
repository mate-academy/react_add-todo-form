import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userSelect, setUserSelect] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleErrors = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasTitleError(!title);
    setHasUserError(!userSelect);

    if (!title || !userSelect) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: title,
      userId: userSelect,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserSelect(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleErrors}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError ? (
            <span className="error">Please enter a title</span>
          ) : null}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setUserSelect(Number(event.target.value));
              setHasUserError(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError ? (
            <span className="error">Please choose a user</span>
          ) : null}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList users={usersFromServer} todos={todos} />
    </div>
  );
};
