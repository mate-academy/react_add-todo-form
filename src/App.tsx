import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/todo';
import { User } from './types/user';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [listOfTodos, setTodos] = useState(todos);
  const [newTodoWrite, setNewTodo] = useState('');
  const [selectUserId, setSelectUserId] = useState(0);
  const [userError, setUserError] = useState(false);
  const [todoError, setTodoError] = useState(false);

  const handleFromServer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: todos[todos.length - 1].id + 1,
      title: newTodoWrite,
      userId: selectUserId,
      completed: false,
      user: getUser(selectUserId),
    };

    setUserError(!newTodo.user);
    setTodoError(!newTodo.title);

    if (newTodo.user && newTodo.title.trim()) {
      setTodos([...listOfTodos, newTodo]);
      setNewTodo('');
      setSelectUserId(0);
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNewTodo(value.replace(/[^A-Za-z\s\d\u0400-\u04FF]/g, ''));
    setTodoError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(+(event.target.value));
    setUserError(false);
  };

  return (
    <div className="App">
      <h1 data-cy="titleInput">
        Add todo form
      </h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFromServer}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTodoWrite}
              onChange={handleTitle}
            />
            {todoError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="">
            User:
            <select
              data-cy="userSelect"
              value={selectUserId}
              onChange={handleUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
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

      <TodoList todos={listOfTodos} />
    </div>
  );
};
