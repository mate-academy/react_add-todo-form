import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todos } from './types/Todos';

function getUserByid(userId: number): User | null {
  return usersFromServer.find(user => user?.id === userId)
    || null;
}

const initialTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserByid(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [isUserIdError, setIsUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizeTitle
      = event.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(sanitizeTitle.trimStart());
    setIsTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setIsUserIdError(false);
    setIsTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(!title);
    setIsUserIdError(!userId);

    if (!userId || !title) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        userId,
        completed: false,
        user: getUserByid(userId),
      },
    ]);

    reset();
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
            id='title"'
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-id">User: </label>

          <select
            id="user-id"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
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

          {isUserIdError && (
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
