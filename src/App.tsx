import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { ExtendedTodo } from './types/ExtendedTodo';
import { TodoList } from './components/TodoList';

const findUserById = (users: User[], userId: number) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const extendedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(usersFromServer, todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<ExtendedTodo[]>(extendedTodos);

  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const setDefaultStates = () => {
    setTitle('');
    setUserId(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimTitle = title.trim();
    const makeTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

    setTitleError(!trimTitle);
    setUserError(!userId);

    if (!trimTitle || !userId) {
      return;
    }

    const newTodo = {
      id: makeTodoId,
      title,
      completed: false,
      userId,
      user: findUserById(usersFromServer, userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setDefaultStates();
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleInput}
            />
            {titleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleSelect}
            >
              <option value={0} disabled>Choose a user</option>

              {usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option value={id} key={id}>{name}</option>
                );
              })}
            </select>

            {userError && (
              <span className="error">Please choose a user</span>
            )}
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
