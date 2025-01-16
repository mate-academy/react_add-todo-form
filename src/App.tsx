import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser, User } from './App.types';
import { TodoList } from './components/TodoList';

const todos: TodoWithUser[] = todosFromServer.map((todo): TodoWithUser => {
  const user = usersFromServer.find(
    userInfo => userInfo.id === todo.userId,
  ) as User;

  return {
    ...todo,
    user,
  };
});

export const App = () => {
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

      <TodoList todos={todos} />
    </div>
  );
};
