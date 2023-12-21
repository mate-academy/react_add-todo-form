import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          Title:&nbsp;
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          User:&nbsp;
          <select data-cy="userSelect">
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>{user.name}</option>
              );
            })}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todosFromServer}
      />
    </div>
  );
};
