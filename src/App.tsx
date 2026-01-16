import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const todos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [newTodos, setNewTodos] = useState<Todo[]>(todos);
  const [newUser, setNewUser] = useState<number>(0);
  const [newTitle, setNewTitle] = useState<string>('');
  const [hasUserError, setHasUserError] = useState<boolean>(false);
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value);
    setHasTitleError(false);
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setNewUser(+event.target.value);
    setHasUserError(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setHasTitleError(!newTitle.trim());
    setHasUserError(!newUser);

    if (!newTitle.trim() || !newUser) {
      return;
    }

    const findUser = getUserById(newUser);

    const newId = Math.max(...newTodos.map(todo => todo.id), 0) + 1;

    const newTodo = {
      id: newId,
      title: newTitle,
      userId: newUser,
      user: findUser,
      completed: false,
    };

    setNewTodos([...newTodos, newTodo]);

    setNewTitle('');
    setNewUser(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            id="title-input"
            placeholder="Enter a title"
            value={newTitle}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User:</label>
          <select
            data-cy="userSelect"
            id="user-select"
            value={newUser}
            onChange={handleUserChange}
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

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
