import './App.scss';
import { TodoList } from './components/TodoList';
import { getPreparedData } from './helpers/getPreparedData';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedData = getPreparedData(
  todosFromServer,
  usersFromServer,
);

export const App = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input type="text" data-cy="titleInput" />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select data-cy="userSelect">
            <option value="0" disabled>Choose a user</option>
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={preparedData} />
    </div>
  );
};
