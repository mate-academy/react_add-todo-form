import './App.scss';

import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import TodoWithUser from './types/TodoWithUser';
import { TodoList } from './components/TodoList';

import findUserById from './services/findUserById';
import getTodosWithUsers from './services/getTodosWithUsers';
import findMaxTodoId from './services/findMaxTodoId';

const NON_EXISTING_USER_ID = 0;

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(NON_EXISTING_USER_ID);
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

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectedUserError(selectedUserId === NON_EXISTING_USER_ID);

    if (!title || selectedUserId === NON_EXISTING_USER_ID) {
      return;
    }

    const newTodo: TodoWithUser = {
      user: findUserById(usersFromServer, selectedUserId),
      id: findMaxTodoId(visibleTodos) + 1,
      title: title,
      completed: false,
      userId: selectedUserId,
    };

    setVisibleTodos([...visibleTodos, newTodo]);

    setTitle('');
    setSelectedUserId(NON_EXISTING_USER_ID);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" onSubmit={event => onSubmit(event)}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => handleTitleChange(event.target.value)}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userInput">User: </label>
          <select
            id="userInput"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => handleUserChange(event.target.value)}
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
