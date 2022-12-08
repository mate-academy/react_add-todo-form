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

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [currTodos, setCurrTodos] = useState(todos);

  const isSelected = () => {
    if (title.trim() === '') {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() && userId) {
      const newTodo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        userId,
        title,
        completed: false,
        user: getUserById(userId),
      };

      setCurrTodos(current => ([
        ...current,
        newTodo,
      ]));

      setTitle('');
      setUserId(0);
    }

    isSelected();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
              placeholder="Enter a title"

            />
          </label>

          {titleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              name="userId"
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(Number(event.target.value));
                setUserError(false);
              }}
            >
              <option value="0">
                Choose a user
              </option>

              { usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={currTodos} />
    </div>
  );
};
