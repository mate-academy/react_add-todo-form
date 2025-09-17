import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { useState } from 'react';

function getUserById(currentUserId: number) {
  return usersFromServer.find(user => user.id === currentUserId) || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState('');
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = title.trim();
    const selectedId = userId === '' ? NaN : Number(userId);

    setHasTitleError(!trimmed);
    setHasUserIdError(!userId);

    if (!trimmed || userId === '' || Number.isNaN(selectedId)) {
      return;
    }

    const user = getUserById(selectedId);

    if (!user) {
      setHasUserIdError(true);

      return;
    }

    const newId =
      todos.length === 0 ? 1 : Math.max(...todos.map(todo => todo.id)) + 1;

    const newPost: Todo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: selectedId,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newPost]);

    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="todo-title">
            {'Title: '}
          </label>
          <input
            className="control"
            id="todo-title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="todo-user-id">
            {'User: '}
          </label>

          <select
            className="control"
            id="todo-user-id"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
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

      <TodoList todos={todos.filter(todo => todo.user)} />
    </div>
  );
};
