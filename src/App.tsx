import React, { useState } from 'react';

import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [newTodos, setNewTodos] = useState(todos);
  const [titleError, setTitelError] = useState(false);
  const [userError, setUserError] = useState(false);

  const newTodo = {
    id: Math.max(...(newTodos.map(todo => todo.id))) + 1,
    title,
    userId,
    completed: false,
    user: getUser(userId),
  };

  const addTodo = () => {
    if (title && userId) {
      setNewTodos(prevTodos => (
        [...prevTodos, newTodo]
      ));
    }

    if (!title.trim()) {
      setTitelError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitelError(false);
              }}
            />
          </label>
          {titleError
            && (
              <span className="error">
                Please enter a title
              </span>
            )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(e) => {
                setUserId(Number(e.target.value));
                setUserError(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userError
            && (
              <span className="error">
                Please choose a user
              </span>
            )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={addTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
