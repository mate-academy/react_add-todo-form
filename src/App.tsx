import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { getUserById, getUserByName } from './helpers/helpers';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isTitleValid, setIsTitleValid] = useState<string | boolean>(true);
  const [isUserValid, setIsUserValid] = useState<string | boolean>(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''));
    setIsTitleValid(value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUser(value);
    setIsUserValid(Boolean(value));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleValid(title.trim());
    setIsUserValid(selectedUser);

    if (!title.trim() || !selectedUser) {
      return;
    }

    setTodos((currentTodos) => {
      const maxTodoId = Math.max(...currentTodos.map(todo => todo.id));
      const newUser = getUserByName(selectedUser);

      return [
        ...currentTodos,
        {
          id: maxTodoId + 1,
          title,
          completed: false,
          userId: newUser
            ? newUser.id
            : -1,
          user: newUser,
        },
      ];
    });

    setTitle('');
    setSelectedUser('');
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
          <label>
            {'Title: '}
            <input
              data-cy="titleInput"
              type="text"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
          </label>

          {!isTitleValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option value="" disabled>
                Choose a user
              </option>

              {usersFromServer.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!isUserValid && (
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
