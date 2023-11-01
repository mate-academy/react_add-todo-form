import React, { useContext } from 'react';
import { TodoList } from './components/TodoList';

import './App.scss';

import { appContext } from './context/AppContext';
import { getUserFrom } from './utils/getUser';

const allowedChars = /[а-яА-ЯІіЇїЄєҐґ'a-zA-Z0-9\s]+/;

export const App = () => {
  const {
    query,
    setQuery,
    userId,
    setUserId,
    visibleTodos,
    setVisibleTodos,
    users,
    userError,
    setUserError,
    inputError,
    setInputError,
  } = useContext(appContext);

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!allowedChars.test(value) && value !== '') {
      return;
    }

    setQuery(value);
    setInputError('');
  };

  const handleUserOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setUserId(+value);
    setUserError('');
  };

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) {
      setInputError('Please enter a title');
    }

    if (!userId) {
      setUserError('Please choose a user');
    }

    if (!userId || !query.trim()) {
      return;
    }

    const ids = visibleTodos.map((todo) => todo.id);

    const newTodo = {
      id: Math.max(...ids) + 1,
      title: query,
      userId: +userId,
      completed: false,
      user: getUserFrom(+userId, users),
    };

    setVisibleTodos([...visibleTodos, newTodo]);

    setQuery('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSumbit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={query}
              onChange={handleInputOnChange}
              placeholder="Enter a title"
            />
          </label>
          <span className="error">{inputError}</span>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              onChange={handleUserOnChange}
              value={userId}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <span className="error">{userError}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
