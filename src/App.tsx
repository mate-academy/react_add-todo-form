import './App.scss';
import React, { useState } from 'react';

import { Todo, User } from './types';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const titlePattern = ' '
  + '0123456789'
  + 'abcdefghijklmnopqrstuvwxyz'
  + 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя';

const generateNewId = (todos: Todo[]): number => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

const getUserById = (userIdToFind: number): User | undefined => {
  return usersFromServer.find(user => user.id === userIdToFind);
};

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);

  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = newTitle.trim();

    if (!normalizedTitle) {
      setHasTitleError(true);
      setNewTitle('');
    }

    if (!selectedUserId) {
      setHasUserError(true);
    }

    if (!normalizedTitle || !selectedUserId) {
      return;
    }

    setTodos(currentTodos => {
      const newTodo: Todo = {
        id: generateNewId(currentTodos),
        title: normalizedTitle,
        completed: false,
        userId: selectedUserId,
        user: getUserById(selectedUserId),
      };

      return [...currentTodos, newTodo];
    });

    setNewTitle('');
    setSelectedUserId(0);
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = event.target.value
      .split('')
      .every(char => titlePattern.includes(char.toLowerCase()));

    if (isValid) {
      setNewTitle(event.target.value);
      setHasTitleError(false);
    }
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasUserError(false);
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
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={newTitle}
            onChange={handleTitleInput}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
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
