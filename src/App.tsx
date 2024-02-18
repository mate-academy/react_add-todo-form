import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { ToDo } from './types/Todo';
import todosFromServer from './api/todos';
import { getUserById } from './services/getUserById';

const initialTodos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [finalTodos, setFinalTodos] = useState<ToDo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  const addTodo = (newTodo: ToDo) => {
    setFinalTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasSelectError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectError(!userId);

    if (!title || !title.trim() || !userId) {
      return;
    }

    addTodo({
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-name">User:</label>
          <select
            data-cy="userSelect"
            id="user-name"
            required
            value={userId}
            onChange={handleIdChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={finalTodos} />
    </div>
  );
};
