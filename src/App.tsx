import React, { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/getUser';
import { newTodoId } from './services/newTodoId';
import { TodoWithUser } from './types/TodoWithUser';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [currentUser, setCurrentUser] = useState(0);
  const [currentUserError, setCurrentUserError] = useState(false);

  const [todos, setTodos] = useState(todosFromServer);

  const preparedTodos: TodoWithUser[] = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId, usersFromServer),
  }));

  const reset = () => {
    setTitle('');
    setTitleError(false);
    setCurrentUser(0);
    setCurrentUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
      setTitle('');
    }

    if (!currentUser) {
      setCurrentUserError(true);
    }

    if (title.trim() && currentUser) {
      setTodos([
        ...todos,
        {
          id: newTodoId(todos),
          title,
          completed: false,
          userId: currentUser,
        },
      ]);

      reset();
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUser(+event.target.value);
    setCurrentUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={e => handleChangeTitle(e)}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            defaultValue={0}
            value={currentUser}
            onChange={(e) => handleChangeUser(e)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {currentUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={preparedTodos} />
    </div>
  );
};
