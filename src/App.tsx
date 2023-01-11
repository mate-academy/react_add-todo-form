import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

function getUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const preparedTodo: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const theBiggestIndex = (array: { id: number }[]) => (
  Math.max(...array.map(todo => todo.id)) + 1
);

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState('');

  const [todos, setTodos] = useState(preparedTodo);

  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value);
    setTitleError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setUserError(false);
  };

  const hadleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedTitle === '') {
      setTitleError(true);
    }

    if (selectedUser === 0) {
      setUserError(true);
    }

    if (selectedTitle && selectedUser) {
      setSelectedTitle('');
      setSelectedUser(0);

      setTodos(prev => {
        const newTodo = {
          id: theBiggestIndex(prev),
          userId: selectedUser,
          title: selectedTitle,
          completed: false,
          user: getUser(selectedUser),
        };

        return [...prev, newTodo];
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={hadleSubmit}
      >
        <div className="field">
          <label>
            {' '}
            Title:
            {' '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={selectedTitle}
              onChange={handleTitle}
            />
          </label>
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {' '}
            User:
            {' '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUser}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          {isUserError && (
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
