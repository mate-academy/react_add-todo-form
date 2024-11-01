import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getUserId } from './services/User';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [hasTittleError, setHasTittleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    const todoToAdd: Todo = {
      ...newTodo,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
    };

    setTodos(currentTodos => [...currentTodos, todoToAdd]);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTittleError(false);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTittleError(!title.trim());
    setHasSelectError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const newTodo = {
      title,
      userId,
      completed: false,
      user: getUserId(userId),
      id: 0,
    };

    addTodo(newTodo);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:&nbsp;</label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />

          {hasTittleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:&nbsp;</label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={handleChangeSelect}
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

          {hasSelectError && (
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
