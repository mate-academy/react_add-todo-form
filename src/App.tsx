import React, { useState } from 'react';

import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setisUserError] = useState(false);

  const addTodo = () => {
    const newTodo = {
      id: Math.max(...todos.map(({ id }) => id)) + 1,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    todos.push(newTodo);
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.length === 0 || userId === 0) {
      setIsTitleError(!title);
      setisUserError(!userId);

      return;
    }

    addTodo();
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^A-Za-z-А-Яа-я-іІїЇєЄ\s]/g, ''));
    setIsTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setisUserError(false);
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

          <label htmlFor="title">
            {'Title: '}
          </label>

          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
          />

          <span className="error">
            {isTitleError && 'Please enter a title'}
          </span>
        </div>

        <div className="field">

          <label htmlFor="user">
            {'User: '}
          </label>

          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ name, id }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>

          <span className="error">
            {isUserError && 'Please choose a user'}
          </span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
