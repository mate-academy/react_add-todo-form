import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import React, { useState } from 'react';

import { TodoList } from './components/TodoList';
import { User } from './components/UserInfo';

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User | null;
};

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getTodoId(initialTodos: Todo[]) {
  const todoArrId = initialTodos.map(todo => todo.id);

  return Math.max(...todoArrId) + 1;
}

export const App: React.FC = () => {
  const [titleValue, setTitleValue] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userValue, setUserValue] = useState(0);
  const [userError, setUserError] = useState(false);
  const [currentTodos, setCurrentTodo] = useState(todos);

  const addTodo = (newTodo: Todo) => {
    setCurrentTodo((prevTodos: Todo[]) => [...prevTodos, newTodo]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserError(!userValue);
    setTitleError(!titleValue.trim());

    if (!titleValue.trim() || !userValue) {
      return;
    }

    const newTodo: Todo = {
      id: getTodoId(currentTodos),
      title: titleValue,
      userId: userValue,
      user: getUserById(userValue),
      completed: false,
    };

    addTodo(newTodo);

    setTitleValue('');
    setUserValue(0);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleValue}
            onChange={e => {
              setTitleValue(e.target.value);
              setTitleError(false);
            }}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="users">User: </label>

          <select
            id="users"
            data-cy="userSelect"
            value={userValue}
            required
            onChange={e => {
              setUserValue(+e.target.value);
              setUserError(false);
            }}
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

          {userError && <span className="error">Please choose a user</span>}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
      
    </div>
  );
};
