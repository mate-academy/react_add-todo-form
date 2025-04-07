import './App.scss';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, User } from './types/types';
import React, { useState } from 'react';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function newTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id), 0);

  return maxId + 1;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [userId, setUserId] = useState(0);
  const [errorUserId, setErrorUserId] = useState(false);
  const [todos, setTodos] = useState(initialTodos);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setErrorUserId(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setErrorTitle(false);
    setErrorUserId(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isEmptyTitle = title.trim() === '';
    const isUserNotSelected = userId === 0;

    setErrorTitle(isEmptyTitle);
    setErrorUserId(isUserNotSelected);

    if (isEmptyTitle || isUserNotSelected) {
      return;
    }

    addTodo({
      id: newTodoId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title:&nbsp;&nbsp;
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
            {errorTitle && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label htmlFor="select">
            User:&nbsp;&nbsp;
            <select
              id="select"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserId}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errorUserId && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
