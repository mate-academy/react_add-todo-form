import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import TodoWithUser from './types/TodoWithUser';
import { TodoList } from './components/TodoList';

import { findUserById, findMaxUserId, getTodosWithUsers } from './services';

import './App.scss';

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasSelectedUserError, setHasSelectedUserError] = useState(false);

  const [visibleTodos, setVisibleTodos] = useState<TodoWithUser[]>(
    getTodosWithUsers(todosFromServer, usersFromServer),
  );

  function handleTitleChange(value: string) {
    setTitle(value);
    setHasTitleError(false);
  }

  function handleUserChange(value: string) {
    setSelectedUserId(parseInt(value));
    setHasSelectedUserError(false);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setHasTitleError(!title);
    setHasSelectedUserError(selectedUserId === 0);

    if (!title || selectedUserId === 0) {
      return;
    }

    const newTodo: TodoWithUser = {
      user: findUserById(usersFromServer, selectedUserId),
      id: findMaxUserId(usersFromServer) + 1,
      title,
      completed: false,
      userId: selectedUserId,
    };

    setVisibleTodos([...visibleTodos, newTodo]);

    setTitle('');
    setSelectedUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={e => onSubmit(e)}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userInput">User: </label>
          <select
            data-cy="userSelect"
            id="userInput"
            value={selectedUserId}
            onChange={e => handleUserChange(e.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectedUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
