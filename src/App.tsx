import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

const getUser = (userId: number): User | null => usersFromServer
  .find(user => user.id === userId) || null;

const visibleTodos: Todo[] = todosFromServer
  .map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

const todosId = visibleTodos
  .map(todo => todo.id);

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isCorrectTitle, setIsCorrectTitle] = useState(true);
  const [isCorrectUser, setIsCorrectUser] = useState(true);

  const getTodo = (): void => {
    const newTodo: Todo = {
      id: Math.max(...todosId) + 1,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    visibleTodos.push(newTodo);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsCorrectUser(true);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsCorrectTitle(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setIsCorrectUser(false);
    }

    if (!title.trim()) {
      setIsCorrectTitle(false);
    }

    if (!userId || !title.trim()) {
      return;
    }

    getTodo();

    setUserId(0);
    setTitle('');
    setIsCorrectTitle(true);
    setIsCorrectUser(true);
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
            <span>{'Title: '}</span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
            />
            {
              isCorrectTitle
                || <span className="error">Please enter a title</span>
            }
          </label>
        </div>

        <div className="field">
          <label htmlFor="userId">
            <span>{'User: '}</span>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleChangeUser}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(({ name, id }) => (
                <option value={id} key={id}>{name}</option>
              ))}

            </select>

            {
              isCorrectUser
              || <span className="error">Please choose a user</span>
            }
          </label>

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
