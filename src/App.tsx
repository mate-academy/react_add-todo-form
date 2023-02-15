import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [updatedTodos, setUpdatedTodos] = useState(todos);
  const [checkSelection, setCheckSelection] = useState(false);
  const [checkTitle, setCheckTitle] = useState(false);

  const maxId = (currentTodos: Todo[]) => {
    return Math.max(...currentTodos.map(todo => todo.id)) + 1;
  };

  const checkTitleName = (titleName: string): boolean => {
    return !(titleName.split('').every(ch => ch === ' '));
  };

  const clearForm = () => {
    setUserId(0);
    setTitle('');
    setCheckSelection(false);
    setCheckTitle(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setCheckTitle(true);
    }

    if (checkTitleName(title) && userId !== 0) {
      const addTodo = {
        user: getUserById(userId),
        id: maxId(updatedTodos),
        title,
        completed: false,
        userId,
      };

      setUpdatedTodos(current => ([
        ...current,
        addTodo,
      ]));

      clearForm();
    } else {
      setCheckSelection(true);
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
          <label htmlFor="todoTitle">Title:</label>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Type a new title"
            id="todoTitle"
          />
          {checkTitle && title.trim() === '' && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userForTodo">User:</label>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => setUserId(+event.target.value)}
            id="userForTodo"
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {!userId && checkSelection && (
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

      <TodoList todos={updatedTodos} />
    </div>
  );
};
