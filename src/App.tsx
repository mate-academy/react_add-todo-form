import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const defaultForm = { title: '', userId: 0 };

export const App = () => {
  const [formInfo, setFormInfo] = useState(defaultForm);
  const [formErrors, setFormErrors] = useState({
    isTitleError: false,
    isSelectError: false,
  });
  const [todosArray, setTodosArray] = useState(todosFromServer);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfo({ ...formInfo, title: event.target.value });
    setFormErrors({ ...formErrors, isTitleError: false });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormInfo({ ...formInfo, userId: Number(event.target.value) });
    setFormErrors({ ...formErrors, isSelectError: false });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formInfo.title.trim() && !formInfo.userId) {
      setFormErrors({ isSelectError: true, isTitleError: true });

      return;
    }

    if (!formInfo.title.trim()) {
      setFormErrors({ ...formErrors, isTitleError: true });

      return;
    } else if (!formInfo.userId) {
      setFormErrors({ ...formErrors, isSelectError: true });

      return;
    }

    setTodosArray([
      ...todosArray,
      {
        ...formInfo,
        completed: false,
        id: Math.max(...todosArray.map(todo => todo.id)) + 1,
      },
    ]);
    setFormInfo(defaultForm);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={formInfo.title}
            placeholder="Enter a title"
            id="title"
            onChange={handleInput}
          />
          {formErrors.isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>
        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={formInfo.userId}
            onChange={handleSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {formErrors.isSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todosArray.map(todo => {
          return {
            ...todo,
            user: usersFromServer.find(user => user.id === todo.userId),
          };
        })}
      />
    </div>
  );
};
