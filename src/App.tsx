import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { getUserById } from './functions/getUserById';
import { Todo } from './types/todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const visibleTodos = [...todos].map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  function reset() {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  }

  function generateTodoId() {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: generateTodoId(),
      title: title,
      userId: userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(prev => [...prev, newTodo]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
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

      <TodoList todos={visibleTodos} />
    </div>
  );
};
