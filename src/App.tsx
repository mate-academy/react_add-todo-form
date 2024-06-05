import './App.scss';
import 'bulma';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  return (
    <div className="App">
      <h1 className="title is-1">Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="todo-title" className="label">
            Title:
          </label>
          <input type="text" data-cy="titleInput" id="todo-title" />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label htmlFor="todo-user" className="label">
            Title:
          </label>
          <select data-cy="userSelect" id="todo-user">
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              data-cy="submitButton"
              className="button is-link"
            >
              Add
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
