import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { titlePattern, getFormattedTodos } from './services/service';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isFieldFocused, setIsFieldFocused] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const formattedTodos = getFormattedTodos(todos);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => {
      return [...currentTodos, newTodo];
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFieldFocused(true);
    setTitle(event.target.value.replace(titlePattern, ''));
  };

  const handleSubmitButton = () => {
    setIsFormSubmitted(true);
    setIsFieldFocused(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setIsFormSubmitted(false);
  };

  const isFormValid = title && userId;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid) {
      addTodo({
        title,
        completed: false,
        userId: userId,
        id: Math.max(...todos.map(({ id }) => id)) + 1,
      });

      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {!title && isFormSubmitted && !isFieldFocused && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-select">
            User:&nbsp;
            <select
              id="user-select"
              data-cy="userSelect"
              value={userId}
              onChange={event => setUserId(+event.target.value)}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!userId && isFormSubmitted && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleSubmitButton}
        >
          Add
        </button>
      </form>

      <TodoList todos={formattedTodos} />
    </div>
  );
};
