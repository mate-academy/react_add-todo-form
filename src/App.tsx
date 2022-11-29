import './App.scss';
import React, { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTittleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const addTodo = (id: number) => {
    const foundedUser = usersFromServer.find(user => user.id === id);
    const uniqueId = Math.max(...todos.map(todo => todo.id)) + 1;

    if (title.trim().length === 0) {
      setTittleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (foundedUser && title.trim().length > 0) {
      todos.push({
        id: uniqueId,
        userId: id,
        title,
        completed: false,
        user: foundedUser,
      });

      setTitle('');
      setSelectedUser(0);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTittleError(false);
  };

  const handleUserSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setUserError(false);
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(selectedUser);
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
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
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
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserSelection}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
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

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
