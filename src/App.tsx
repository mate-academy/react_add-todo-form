import React, { ChangeEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNextTodoId = (prevTodos: Todo[]) => {
  const findLastId = Math.max(...prevTodos.map(todo => todo.id));

  return findLastId + 1;
};

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [
    shouldShowValidationErrors,
    setShouldShowValidationErrors,
  ] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState(todos);

  const selectedUser = getUserById(userId) || null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUser || !title.trim()) {
      setShouldShowValidationErrors(true);
    }

    if (selectedUser && title.trim()) {
      const addedTodo = {
        id: getNextTodoId(selectedTodos),
        title,
        completed: false,
        userId,
        user: selectedUser,
      };

      setSelectedTodos(curTodos => ([
        ...curTodos,
        addedTodo,
      ]));

      setUserId(0);
      setTitle('');
      setShouldShowValidationErrors(false);
    }
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle((value));
  };

  const handleUserID = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(Number(value));
  };

  return (
    <div className="App">
      <h1>
        Add todo form
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {!title && shouldShowValidationErrors && (
            <span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserID}
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

          {!userId && shouldShowValidationErrors && (
            <span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={selectedTodos} />
    </div>
  );
};
