import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            name="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select name="userSelect" data-cy="userSelect" defaultValue="0">
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user: User) => {
              return (
                <option value={user.id}>{user.name}</option>
              );
            })}
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
