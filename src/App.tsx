/* eslint-disable no-console */

import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const todosWithUsers = todosFromServer.map(todo => {
  const { userId } = todo;

  return {
    ...todo,
    user: usersFromServer.find(user => user.id === userId) || null,
  };
});

const todosIds = todosWithUsers.map(todo => todo.id);
const nextId = Math.max(...todosIds) + 1;

export const App:React.FC = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [id, setId] = useState(nextId);
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const [isEmptyUser, setIsEmptyUser] = useState(false);

  const addTodo = () => {
    const user = usersFromServer.find(selectUser => (
      selectUser.name === userName
    ));

    if (!title) {
      setIsEmptyTitle(true);
    }

    if (!userName) {
      setIsEmptyUser(true);
    }

    if (user && title) {
      setTodos(current => {
        const newTodo: Todo = {
          title: title.trim(),
          user,
          id,
          completed: false,
          userId: user.id,
        };

        setTitle('');
        setUserName('');
        setId(currentId => currentId + 1);

        return [
          ...current,
          newTodo,
        ];
      });
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const reg = /[^A-Za-z0-9a-я ]/;

    if (isEmptyTitle) {
      setIsEmptyTitle(false);
    }

    setTitle(value.replace(reg, ''));
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (isEmptyUser) {
      setIsEmptyUser(false);
    }

    setUserName(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        onSubmit={handleSubmit}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={handleTitle}
          />
          {isEmptyTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={userName}
            onChange={handleUser}
          >
            <option
              selected
              disabled
              value=""
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          {isEmptyUser && <span className="error">Please choose a user</span>}
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
