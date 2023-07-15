import React, { useState } from 'react';
import { v4 } from 'uuid';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [userValue, setUserValue] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const idCreator = () => v4();

  const createToDo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle) {
      setTitleError(true);

      return;
    }

    if (!userValue) {
      setUserError(true);

      return;
    }

    const newTodo = {
      id: +idCreator(),
      title: todoTitle,
      completed: false,
      userId: userValue,
    };

    setTodos(() => [...todos, newTodo]);

    setUserValue(0);
    setTodoTitle('');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={createToDo}
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={todoTitle}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={e => {
              setTitleError(false);
              setTodoTitle(e.target.value);
            }}
          />
          { titleError && <span className="error">Please enter a title</span> }
        </div>

        <div className="field">
          <label htmlFor="select">User:</label>
          <select
            data-cy="userSelect"
            id="select"
            value={userValue}
            onChange={e => {
              setUserError(false);
              setUserValue(+e.target.value);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map((user) => {
                return (
                  <option key={user.id} value={user.id}>{user.name}</option>
                );
              })
            }
          </select>
          { userError && <span className="error">Please choose a user</span> }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {
          todos.map(({
            id,
            title,
            completed,
            userId,
          }) => {
            const curentUser = usersFromServer.find(
              (user) => user.id === userId,
            );

            return (
              <article
                key={id}
                data-id={id}
                className={
                  classNames('TodoInfo', { 'TodoInfo--completed': completed })
                }
              >
                <h2 className="TodoInfo__title">
                  {title}
                </h2>

                <a className="UserInfo" href="mailto:Sincere@april.biz">
                  {curentUser?.name}
                </a>
              </article>
            );
          })
        }
      </section>
    </div>
  );
};
