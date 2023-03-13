import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  return usersFromServer.find((user) => user.id === userId) || null;
}

const todosWithUsers: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

const getLastTodoIndex = (todos: Todo[]) => (
  Math.max(...todos.map(({ id }) => id))
);

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [shouldShowTitleError, setShouldShowTitleError] = useState(false);
  const [shouldShowUserError, setShouldShowUserError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.nativeEvent.preventDefault();

    const trimmedTitle = title.trim();

    setShouldShowTitleError(!trimmedTitle);
    setShouldShowUserError(!selectedUserId);

    if (trimmedTitle && selectedUserId) {
      const newTodo: Todo = {
        id: getLastTodoIndex(todos) + 1,
        userId: selectedUserId,
        title,
        completed: false,
        user: getUser(selectedUserId),
      };

      setTodos((currentTodos) => [...currentTodos, newTodo]);
      clearForm();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShouldShowTitleError(false);

    const inputValue = event.target.value;

    // removing any special characters from a Title
    setTitle(inputValue.replace(/[^A-Za-z\s\d\u0400-\u04FF]/g, ''));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
    setShouldShowUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => handleFormSubmit(event)}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:
            <input
              type="text"
              id="titleInput"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => handleTitleChange(event)}
            />
          </label>
          {shouldShowTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:
            <select
              data-cy="userSelect"
              id="userSelect"
              placeholder="Choose a user"
              value={selectedUserId}
              onChange={(event) => handleUserChange(event)}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {shouldShowUserError && (
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
