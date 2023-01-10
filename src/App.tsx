import React, { FC, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const startTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState<Todo[]>(startTodos);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setUser('');
  };

  const getMaxId = (): number => {
    const todosIds = todos.map(todo => todo.id);
    const largestId = Math.max(...todosIds);

    return largestId;
  };

  const getIdByUsername = (userName: string): number | null => {
    return usersFromServer.find(person => person.name === userName)?.id || null;
  };

  const getUserByUsername = (userName: string): User | null => {
    return usersFromServer.find(
      person => person.name === userName,
    ) || null;
  };

  const handleAdding = () => {
    const todoToAdd = {
      id: getMaxId() + 1,
      userId: getIdByUsername(user),
      title,
      completed: false,
      user: getUserByUsername(user),
    };

    setTodos((prev) => ([...prev, todoToAdd]));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title === '') {
      setTitleError(true);
    }

    if (user === '') {
      setUserError(true);
    }

    if (title && user) {
      handleAdding();
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
          </label>

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              name="user"
              data-cy="userSelect"
              value={user}
              onChange={(event) => {
                setUser(event.target.value);
                setUserError(false);
              }}
            >
              <option value="" disabled>
                Choose a user
              </option>

              {usersFromServer.map(person => (
                <option
                  key={person.id}
                  value={person.name}
                >
                  {person.name}
                </option>
              ))}
            </select>
          </label>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
