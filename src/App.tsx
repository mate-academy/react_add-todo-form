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

const getLastTodoId = (prevTodos: Todo[]) => {
  const findLastId = Math.max(...prevTodos.map(todo => todo.id));

  return findLastId + 1;
};

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isGoodToSubmit, setIsGoodToSubmit] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState(todos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId || !title.trim()) {
      setIsGoodToSubmit(true);
    }

    if (userId && title.trim()) {
      const addedTodo = {
        id: getLastTodoId(selectedTodos),
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      };

      setSelectedTodos(curTodos => ([
        ...curTodos,
        addedTodo,
      ]));

      setUserId(0);
      setTitle('');
      setIsGoodToSubmit(false);
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

      <form
        onSubmit={handleSubmit}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {!title && isGoodToSubmit && (
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

          {!userId && isGoodToSubmit && (
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
