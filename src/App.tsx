import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState(todosWithUser);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <input type="text" data-cy="titleInput" />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select data-cy="userSelect">
            <option value="0" disabled>
              Choose a user
            </option>
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => {
          const { id, title, completed, user } = todo;

          return (
            <article
              key={id}
              data-id={`${id}`}
              className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
            >
              <h2 className="TodoInfo__title">{title}</h2>

              <a className="UserInfo" href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
};
