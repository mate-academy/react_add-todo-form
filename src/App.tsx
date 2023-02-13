/* eslint-disable max-len */
import './App.scss';
import { TodoList } from './components/TodoList';
/* import { Todo } from './types/Todo'; */

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

/* function getMaxId(todosArray:Todo[]) {
  const idArray: number[] = [];

  todosArray.map(todo => idArray.push(todo.id));

  return Math.max.apply(null, idArray);
} */

export const App = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
            />
            <span className="error" hidden>Please enter a title</span>
          </label>

        </div>

        <div className="field">
          <label>
            {'User: '}
            <select data-cy="userSelect" defaultValue={0}>
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>
              {usersFromServer.map(user => {
                return (
                  <option value={user.id} key={user.id}>{user.name}</option>
                );
              })}
            </select>

            <span className="error" hidden>Please choose a user</span>
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosFromServer} />
    </div>
  );
};
