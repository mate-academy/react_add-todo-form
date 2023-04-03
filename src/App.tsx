import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/todo';
import { User } from './types/user';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosList);
  const [newTodo, setNewTodo] = useState('');
  const [selectUserId, setSelectUserId] = useState(0);
  const [hasUserError, setUserError] = useState(false);
  const [hasTodoError, setTodoError] = useState(false);

  const handleFromServer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodoFromForm = {
      id: todos[todos.length - 1].id + 1,
      title: newTodo,
      userId: selectUserId,
      completed: false,
      user: getUserById(selectUserId),
    };

    setUserError(!newTodoFromForm.user);
    setTodoError(!newTodoFromForm.title.trim());

    if (newTodoFromForm.user && newTodoFromForm.title.trim()) {
      setTodos([...todos, newTodoFromForm]);
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
              value={newTodo}
              onChange={handleTitle}
            />
            {hasTodoError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="select">
            User:
            <select
              data-cy="userSelect"
              value={selectUserId}
              onChange={handleUser}
              id="select"
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
