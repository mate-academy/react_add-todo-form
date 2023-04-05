import './App.scss';
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Users } from './types/Users';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos } from './types/Todos';

const getUser = (userId: number): Users | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasUser, setHasUser] = useState(true);
  const [hasTitle, setHasTitle] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [listTodo, setListTodo] = useState<Todos[]>(todos);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
    | React.FormEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    const user = getUser(userId);
    const nextId = Math.max(...listTodo.map(todo => todo.id));

    const newTodo: Todos = {
      id: nextId + 1,
      title,
      completed: false,
      userId,
      user: user ?? null,
    };

    if (isFormValid) {
      setListTodo([...listTodo, newTodo]);
      setTitle('');
      setUserName('');
      setIsFormSubmitted(false);
    }
  };

  useEffect(() => {
    if (title.trim() === '') {
      setHasTitle(false);
    } else {
      setHasTitle(true);
    }
  }, [title]);

  useEffect(() => {
    if (userName === '') {
      setHasUser(false);
    } else {
      setHasUser(true);
    }
  }, [userName]);

  useEffect(() => {
    if (hasUser && hasTitle) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [hasTitle, hasUser]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value);
      setHasTitle(true);
    } else if (name === 'userName') {
      setUserName(value);
      setHasUser(true);
      setUserId(+value);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            id="titleInput"
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChange}
          />

          {!isFormValid && isFormSubmitted && !hasTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userInput">User: </label>

          <select
            id="userInput"
            name="userName"
            data-cy="userSelect"
            value={userName}
            onChange={handleChange}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map((user: Users) => {
              return <option key={user.id} value={user.id}>{user.name}</option>;
            })}
          </select>
          {!isFormValid && isFormSubmitted && !hasUser && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todolist={listTodo} />
    </div>
  );
};
