import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">
            Title:
            <input type="text" id="title" data-cy="titleInput" />
          </label>
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
            <select data-cy="userSelect" id="user">
              <option value="0" disabled>
                Choose a user
              </option>
            </select>
          </label>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
