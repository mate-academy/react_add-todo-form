import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | null => {
  const correctUser = usersFromServer.find(user => user.id === userId);

  return correctUser || null;
};

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasSelectedUserError, sethasSelectedUserError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sethasSelectedUserError(!selectedUserId);
    setHasTitleError(!title);

    const MaxId = Math.max(...todos.map(todo => todo.id)) + 1;

    const clearForm = () => {
      setTitle('');
      setSelectedUserId(0);
    };

    const newTodo = {
      id: MaxId,
      title,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    if (title && selectedUserId) {
      setTodos((currentTodos) => [...currentTodos, newTodo]);
      clearForm();
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    sethasSelectedUserError(false);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleSelect}
          >
            <option value="0" disabled selected>Choose a user</option>
            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectedUserError && (
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
