import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getLargestTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id));
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoUserId, setNewTodoUserId] = useState('');
  const [todosState, setTodos] = useState(todos);

  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!newTodoTitle);
    setUserError(!newTodoUserId);

    if (newTodoTitle && newTodoUserId) {
      setNewTodoTitle('');
      setNewTodoUserId('');

      const newTodo = {
        id: getLargestTodoId(todos) + 1,
        title: newTodoTitle,
        userId: Number(newTodoUserId),
        completed: false,
        user: getUserById(Number(newTodoUserId)),
      };

      setTodos([...todosState, newTodo]);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;

    setNewTodoTitle(title.replace(/[^a-zA-Z0-9\s]/g, ''));
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTodoUserId(event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <TodoList todos={todosState} />
      <form data-testid="todo-form" onSubmit={handleAddTodo}>
        <label htmlFor="title">
          Title:
          <input
            className="input"
            data-cy="titleInput"
            type="text"
            id="title"
            placeholder="Enter the title"
            value={newTodoTitle}
            onChange={handleTitleChange}
          />

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </label>

        <br />

        <label htmlFor="user">
          User:
          <select
            className="input"
            data-cy="userSelect"
            id="user"
            value={newTodoUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </label>

        <br />

        <button
          className="button"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
    </div>
  );
};
