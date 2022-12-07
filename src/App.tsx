import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function findUserId(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserId(todo.userId),
}));

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const addTodo = (id: number) => {
    const foundedUser = usersFromServer.find(user => user.id === id);
    const uniqId = Math.max(...todos.map(todo => todo.id)) + 1;

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (foundedUser && title.trim()) {
      todos.push({
        id: uniqId,
        userId: id,
        title,
        completed: false,
        user: foundedUser,
      });

      setTitle('');
      setSelectedUser(0);
    }
  };

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const userSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setUserError(false);
  };

  const formSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(selectedUser);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={formSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={titleChange}
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
              onChange={userSelection}
            >
              <option value="0" disabled>
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

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
