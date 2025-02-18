import React, { useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getPreperedTodos } from './utils/getPreperedTodos';
import { getMaxTodoId } from './utils/getMaxTodoId';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const prepTodos: Todo[] = getPreperedTodos(todos);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  function reset() {
    setUserId(0);
    setUserIdError(false);
    setTitle('');
    setTitleError(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (title === '') {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserIdError(true);
    }

    if (title === '' || userId === 0) {
      return;
    }

    const newTodo: Todo = {
      id: getMaxTodoId(todos) + 1,
      title,
      completed: false,
      userId,
    };

    setTodos(current => [...current, newTodo]);

    reset();
  }

  function handleTitleInput(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();

    setTitle(event.currentTarget.value);
    setTitleError(false);
  }

  function handleUserId(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setUserIdError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleInput}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleUserId}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={prepTodos} />
    </div>
  );
};
