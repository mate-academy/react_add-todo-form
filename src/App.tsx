import React, { useState } from 'react';
import './App.scss';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [selectedName, setSelectedName] = useState('');
  const [title, setTitle] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const [isTitleEntred, setIsTitleEntred] = useState(true);
  const [isUserChoosed, setIsUserChoosed] = useState(true);

  const handleUpdatingTodos = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const selectedUser: User | null = usersFromServer
      .find(user => (user.name === selectedName)) || null;

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
      setSelectedName('');
      setTitle('');
      setIsTitleEntred(true);
      setIsUserChoosed(true);
    } else {
      setIsTitleEntred(false);
      setIsUserChoosed(false);
    }
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedName(event.target.value);
  };

  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEntred(true);
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
            onChange={handleSetTitle}
          />

          {!title && !isTitleEntred
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedName}
            onChange={handleSelectUser}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {!selectedName && !isUserChoosed
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
