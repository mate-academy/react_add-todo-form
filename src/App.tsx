import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { Todos } from './types';
import { getUserById } from './services/user';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const initialTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewPostId(todos: Todos[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [newTodos, setNewTodo] = useState<Todos[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const addTodo = (todo: Todos) => {
    const newTodo = {
      ...todo,
      id: getNewPostId(newTodos),
    };

    setNewTodo(currentTodos => [...currentTodos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setHasTitleError(false);
    setUserId(0);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo({
      id: 0,
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
          <label htmlFor="titleInput" className="field__label">
            Title:
            <input
              placeholder="Enter a title"
              type="text"
              id="titleInput"
              name="titleInput"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="userId" className="field__label">
            User:
            <select
              name="userId"
              id="userId"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {hasUserIdError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
