/* eslint-disable max-len */
import './App.scss';
import { TodoList } from './components/TodoList';
/* import { Todo } from './types/Todo'; */

import todosFromServer from './api/todos';

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
            <span className="error">Please enter a title</span>
          </label>

        </div>

        <div className="field">
          <label>
            {'User: '}
            <select data-cy="userSelect">
              <option
                value=""
                disabled
                selected
              >
                Choose a user
              </option>
              <option value="1">user</option>
            </select>

            <span className="error">Please choose a user</span>
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
