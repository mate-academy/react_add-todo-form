import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isGoodToSubmit, setIsGoodToSubmit] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState(todos);

  const setNewTodoId = (prevTodos: Todo[]) => {
    const findLastId = Math.max(...prevTodos.map(todo => todo.id));

    return findLastId + 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId || !title.trim()) {
      setIsGoodToSubmit(true);
    } else {
      const addedTodo = {
        id: setNewTodoId(selectedTodos),
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

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          {!title && isGoodToSubmit && (
            <span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(Number(event.target.value));
            }}
          >
            <option value="0" disabled>Choose a user</option>
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
