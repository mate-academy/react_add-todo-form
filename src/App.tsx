import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { PreparedTodo } from './react-app-env';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [getTitle, setTitle] = useState('');
  const [currentTodos, addTodo] = useState([...todosFromServer]);
  const [errorWarning, showWarning] = useState(false);

  const preparedTodos: PreparedTodo[] = currentTodos.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }));

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
  };

  const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (getTitle.trim().length && userId) {
      addTodo(todos => ([
        ...todos,
        {
          userId,
          id: todos[todos.length - 1].id + 1,
          title: getTitle.trim(),
          completed: false,
        },
      ]));

      setUserId(0);
      setTitle('');
      showWarning(false);
    } else {
      showWarning(true);
    }
  };

  return (
    <div className="App main">
      <h1 className="title is-2">Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={getTitle}
            onChange={handleInput}
            placeholder="Your title expected here"
            className="input is-success large is-rounded"
          />
          {!getTitle.length && errorWarning && (
            <p className="error">
              Please enter a title
            </p>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="users"
            id="users"
            value={userId}
            onChange={handleSelect}
            className="select is-rounded is-large"
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!userId && errorWarning && (
            <p className="error">
              Please choose a user
            </p>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={onSubmit}
          className="button is-info large"
        >
          Add
        </button>
      </form>

      <h1 className="title">User with Todos</h1>
      <section className="sectionList">
        <article className="sectionTodos">
          <TodoList preparedTodos={preparedTodos} />
        </article>
      </section>
    </div>
  );
};
