import './App.scss';
import React, { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const pattern = /^[a-zA-Z0-9Є-ЯҐа-їґ ]+$/;

  const getUser = getUserById(userId);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (pattern.test(event.target.value) || event.target.value === '') {
      setHasTitleError(false);
      setTitle(event.target.value.trimStart());
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);

      return;
    }

    if (!getUser) {
      setHasUserIdError(true);

      return;
    }

    if (title && userId) {
      setTodos(currentTodos => [
        ...currentTodos,
        {
          id: getNewTodoId(todos),
          title,
          userId: getUser.id,
          user: getUser,
          completed: false,
        },
      ]);
    }

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        onReset={reset}
      >
        <div className="field">
          <label className="label" htmlFor="post-title">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            id="post-title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            autoComplete="off"
          />

          {hasTitleError && (
            <span className="error"> Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="post-user-id">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="post-user-id"
            value={userId}
            onChange={handleUserIdChange}
            required
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}

          </select>

          {hasUserIdError && (
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
