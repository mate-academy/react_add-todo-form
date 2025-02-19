import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import { getMaxId } from './api/getid';

export const App = () => {
  const [todosList, setTodosList] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUser] = useState(0);

  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title) {
      setTitleError(true);
      hasError = true;
    } else {
      setTitleError(false);
    }

    if (!userId) {
      setUserError(true);
      hasError = true;
    } else {
      setUserError(false);
    }

    if (hasError) {
      return;
    }

    const newTodo = {
      title,
      userId,
      id: getMaxId(todosList) + 1,
      completed: false,
    };

    setTodosList(prev => [...prev, newTodo]);

    /// clear form
    setTitle('');
    setUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            placeholder="Please enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUser(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(e => {
              return (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} users={usersFromServer} />
    </div>
  );
};
