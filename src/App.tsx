/* eslint-disable no-useless-return */
import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { getUserById } from './services/user';

import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const preparedTodos: Todo[] = todosFromServer.map((todo) => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [newTodos, setNewTodos] = useState<Todo[]>(preparedTodos);

  function validateTitle(input: string) {
    const validateInput = input.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    return validateInput;
  }

  const addTodo = (newPreparedTodo: Todo) => {
    setNewTodos((currentTodos) => [
      ...currentTodos,
      { ...newPreparedTodo },
    ]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validateInput = validateTitle(event.target.value);

    setTitle(validateInput);
    setHasTitleError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const newPreparedTodo: Todo = {
      id: Math.max(...newTodos.map(t => t.id)) + 1,
      completed: false,
      title,
      userId,
      user: getUserById(userId),
    };

    addTodo(newPreparedTodo);
    reset();
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError
            && (
              <span className="error">Please enter a title</span>
            )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
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

      <TodoList
        todos={newTodos}
      />
    </div>
  );
};
