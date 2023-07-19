import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

const getNewUser = (userId: number): User | null => {
  return usersFromServer.find(
    user => user.id === userId,
  ) || null;
};

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getNewUser(todo.userId),
}));

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setnewUserId] = useState(0);
  const [newTitleError, setnewTitleError] = useState(false);
  const [newUserIdError, setnewUserIdError] = useState(false);
  const [newTodos, setNewTodos] = useState(todos);

  const addNewTodo = () => {
    if (newUserId && newTitle) {
      const newTodo = {
        id: Math.max(...newTodos.map(todo => todo.id)) + 1,
        userId: newUserId,
        completed: false,
        title: newTitle,
        user: getNewUser(newUserId),
      };

      setNewTodos((prevTodos) => ([...prevTodos, newTodo]));
      setnewUserId(0);
      setNewTitle('');
      setnewUserIdError(false);
      setnewTitleError(false);
    }

    if (!newTitle) {
      setnewTitleError(true);
    }

    if (!newUserId) {
      setnewUserIdError(true);
    }
  };

  const isSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewTodo();
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
    setnewTitleError(false);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setnewUserId(+event.target.value);
    setnewUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={isSubmitted}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={handleTitle}
          />
          {newTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userId">User: </label>
          <select
            data-cy="userSelect"
            value={newUserId}
            onChange={handleUserId}
            name="user"
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

          {newUserIdError && (
            <span
              className="error"
            >
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={newTodos} />
    </div>
  );
};
