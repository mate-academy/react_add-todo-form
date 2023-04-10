/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import React, { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [option, setOption] = useState(0);
  const [title, setTitle] = useState('');
  const [todos, setNewTodo] = useState(initialTodos);
  const [titleError, setTitleError] = useState(false);
  const [selectUserError, setSelectUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(Boolean(!title));
    setSelectUserError(Boolean(!option));
    if (!title || !option) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...initialTodos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: option,
      user: getUser(option),
    };

    setNewTodo([...todos, newTodo]);

    setTitle('');
    setOption(0);
  };

  const userChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(+event.target.value);
  };

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value
      .replace(/[^a-zа-яё0-9\s]/gi, ' ')
      .replace(/[^a-z]/g, ''));
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
          <label>
            Title:
            {' '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={titleChange}
            />
            {title === ''
              && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              data-cy="userSelect"
              value={option}
              onChange={userChange}
            >
              <option>Choose a user</option>

              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {option === 0
              && <span className="error">Please choose a user</span>}
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
