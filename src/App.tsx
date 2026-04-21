import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todos } from './types/Types';

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>(
    todosFromServer
      .map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }))
      .filter(todo => todo.user !== undefined) as Todos[],
  );
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

    const foundUser = usersFromServer.find(u => u.id === userSelect);

    if (!foundUser) {
      return;
    }

    const maxId = Math.max(0, ...todos.map(t => t.id));

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: foundUser.id,
      user: foundUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserSelect(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleErrors}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userSelect}
            onChange={event => {
              setUserSelect(Number(event.target.value));
              setHasUserError(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
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

      <TodoList todos={todos} />
    </div>
  );
};
