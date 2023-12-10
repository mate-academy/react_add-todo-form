import './App.scss';
import React, { useState } from 'react';
import { Completed } from './types/types';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { makeComletedTodo, makeNewId, findUser } from './helpers/helpers';

const completedTodo = makeComletedTodo(todosFromServer, usersFromServer);

export const App: React.FC = () => {
  const [todos, setTodos] = useState(completedTodo);

  const onSubmit = (todo: Completed) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const [title, setTodoTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setUserError] = useState(false);

  const reset = () => {
    setTodoTitle('');
    setUserId(0);
  };

  const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
    setTitleError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setUserError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (title && userId) {
      onSubmit({
        id: makeNewId(todos),
        title,
        completed: false,
        userId,
        user: findUser(usersFromServer, userId),
      });

      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError
          && (<span className="error"> Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="users">Users: </label>
          <select
            id="users"
            data-cy="userSelect"
            onChange={handleUserChange}
            value={userId}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((person) => {
              return (
                <option
                  key={person.id}
                  value={person.id}
                >
                  {person.name}
                </option>
              );
            })}
          </select>

          {hasUserError && <span className="error"> Please choose a user</span>}
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
