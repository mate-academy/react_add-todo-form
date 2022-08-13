import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import { User } from './type/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

function chooseKey() {
  const maxKey = [...todos].sort((a, b) => b.id - a.id);

  return maxKey[0].id + 1;
}

const addTodo = (title: string, userId: number): void => {
  const Todo = {
    id: chooseKey(),
    title,
    userId,
    completed: false,
    user: getUser(userId),
  };

  todos.push(Todo);
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);

    if (value.trim() !== '') {
      setErrorTitle(false);
    }
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(value);

    if (value !== '0') {
      setErrorUser(false);
    }
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() && userId === '0') {
      setErrorUser(true);
      setErrorTitle(true);

      return;
    }

    if (!title.trim()) {
      setErrorTitle(true);

      return;
    }

    if (userId === '0') {
      setErrorUser(true);

      return;
    }

    addTodo(title, +userId);
    setTitle('');
    setUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
            placeholder="Enter a title"
          />
          {errorTitle && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <span>Choose a user: </span>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUser}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorUser && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
