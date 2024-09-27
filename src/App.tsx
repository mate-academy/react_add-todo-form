import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { useState } from 'react';
import { getAvailableTodoId } from './utils/getAvailableTodoId';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [titleHasError, setTitleHasError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdHasError, setUserIdHasError] = useState(false);

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleHasError(false);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdHasError(false);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleHasError(!title.trim());
    setUserIdHasError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: getAvailableTodoId(currentTodos),
          title: title,
          completed: false,
          userId: userId,
        },
      ];
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleInput}
            onBlur={event => setTitleHasError(!event.target.value)}
          />

          {titleHasError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserId}
            onBlur={event => setUserIdHasError(!event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdHasError && (
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
