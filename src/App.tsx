import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const correctUser = usersFromServer.find(user => user.id === userId);

  return correctUser || null;
}

function getUserByName(userName: string) {
  const correctUser = usersFromServer.find(({ name }) => userName === name);

  return correctUser || null;
}

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [selectedUser, setSelectedUser] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const getNewId = () => (
    new Date().getTime()
  );

  const addTodo = (arr: Todo[]) => {
    const correctUser = getUserByName(selectedUser);

    if (correctUser) {
      const newTodo: Todo = {
        id: getNewId(),
        userId: correctUser.id,
        title,
        completed: false,
        user: correctUser,
      };

      setTodos([...arr, newTodo]);
    }
  };

  const clearForm = () => {
    setSelectedUser('');
    setTitle('');
    setErrorMessage(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  const handleTitleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !selectedUser) {
      setErrorMessage(true);

      return;
    }

    addTodo(todos);
    clearForm();
  };

  const titleErrorStatus = !title && errorMessage;
  const userErrorStatus = !selectedUser && errorMessage;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleTitleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleErrorStatus && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="" disabled selected>Choose a user</option>
            {usersFromServer.map((user) => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userErrorStatus && (
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
