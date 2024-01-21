import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { findUser, getId } from './Utils/Functions';

export const App = () => {
  const [title, setTitle] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(todosFromServer);
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);
  const [targetUser, setTargetUser] = useState(0);

  const todosWithUser = visibleTodos.map(todo => ({
    ...todo,
    user: findUser(todo.userId, usersFromServer),
  }));

  const reset = () => {
    setTitle('');
    setIsValidUser(false);
    setIsValidTitle(false);
    setTargetUser(0);
  };

  const newTodoAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsValidTitle(true);
      setTitle('');
    }

    if (!targetUser) {
      setIsValidUser(true);
    }

    if (title.trim() && targetUser) {
      setVisibleTodos(
        [...visibleTodos,
          {
            id: getId(visibleTodos) + 1,
            title,
            completed: false,
            userId: targetUser,
          }],
      );

      reset();
    }
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsValidTitle(false);
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetUser(+event.target.value);
    setIsValidUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={newTodoAdd}
      >

        <div className="field">
          <label htmlFor="titleInput">
            Title:&nbsp;
          </label>
          <input
            onChange={event => changeTitle(event)}
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {isValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userPick">
            User:&nbsp;
          </label>
          <select
            data-cy="userSelect"
            defaultValue={0}
            value={targetUser}
            onChange={event => changeUser(event)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isValidUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUser} />
    </div>
  );
};
