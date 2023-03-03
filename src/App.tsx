import React, { useState } from 'react';
import './App.scss';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [selectedUserID, setSelectedUserID] = useState(0);
  const [title, setTitle] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const [isTitleEntred, setIsTitleEntred] = useState(true);
  const [isUserChoosed, setIsUserChoosed] = useState(true);

  const handleUpdatingTodos = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const selectedUser = getUserById(selectedUserID);

    const todoID: number = Math
      .max(...visibleTodos.map(todo => todo.id)) + 1;

    if (selectedUser && title.trim()) {
      setVisibleTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: todoID,
            title,
            completed: false,
            userId: selectedUser.id,
            user: selectedUser,
          },
        ];
      });
      setSelectedUserID(0);
      setTitle('');
    }

    if (!title.trim()) {
      setIsTitleEntred(false);
    }

    if (!selectedUser) {
      setIsUserChoosed(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setIsTitleEntred(true);
            }}
          />

          {!isTitleEntred
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserID}
            onChange={(event) => {
              setSelectedUserID(Number(event.target.value));
              setIsUserChoosed(true);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!isUserChoosed
            && <span className="error">Please choose a user</span>}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleUpdatingTodos}
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
