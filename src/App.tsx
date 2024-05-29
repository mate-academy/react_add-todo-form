import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  function addTodo(newTodo: Todo): void {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  function getUserById(userId: number): User | null {
    return usersFromServer.find(user => user.id === userId) || null;
  }

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  function generateId() {
    const maxValue = Math.max(...todos.map(todo => todo.id));

    return maxValue + 1;
  }

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  function reset() {
    setTitle('');
    setUserId(0);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo({
      id: generateId(),
      title,
      userId,
      completed: false,
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="post-title">Title:&nbsp;</label>

          <input
            type="text"
            data-cy="titleInput"
            id="post-title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="post-select">User:&nbsp;</label>

          <select
            data-cy="userSelect"
            id="post-select"
            value={userId}
            onChange={handleUserIdChange}
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

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
