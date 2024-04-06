import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { ChangeEvent, useState } from 'react';
import { TodoList } from './components/TodoList';

const searchUser = (id: number) => {
  return usersFromServer.find(user => user.id === id) || usersFromServer[0];
};

const maxIdTodo = (tod: number[]): number => {
  return Math.max(...tod) + 1;
};

export const App = () => {
  const totosAndUsers = todosFromServer.map(tod => {
    return {
      ...tod,
      user: searchUser(tod.userId),
    };
  });
  const clearTodo = {
    title: '',
    userId: '0',
  };
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [todos, setTodos] = useState(totosAndUsers);
  const [newTodo, setNewTodo] = useState(clearTodo);

  const { title, userId } = newTodo;
  const handleError = () => {
    if (!title) {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }

    if (userId === '0') {
      setErrorUser(true);
    } else {
      setErrorUser(false);
    }
  };

  const handleTitle = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (
      e.target.name === 'title' &&
      !/[A-Za-zА-Яа-я0-9,.!? ]+$/.test(e.target.value) &&
      e.target.value.length > title.length
    ) {
      return;
    }

    debugger;

    setNewTodo(prewTodo => ({
      ...prewTodo,
      [e.target.name]: e.target.value.trimStart(),
    }));
    if (e.target.name === 'title' && e.target.value && errorTitle) {
      setErrorTitle(false);
    }

    if (e.target.name === 'userId' && e.target.value !== '0' && errorUser) {
      setErrorUser(false);
    }
  };

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || userId === '0') {
      return;
    }

    handleError();

    setTodos(prewTodos => [
      ...prewTodos,
      {
        id: maxIdTodo(prewTodos.map(to => to.id)),
        title: title.trim(),
        completed: false,
        userId: +userId,
        user: searchUser(parseInt(userId)),
      },
    ]);

    setNewTodo(clearTodo);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addTodo}>
        <div className="field">
          <input
            placeholder="Add text"
            name="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
            required
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="userId"
            value={userId}
            onChange={handleTitle}
            required
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id.toString()} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleError}>
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
