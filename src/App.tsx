import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './type/Todo';
import { TodoWithuser } from './type/TodoWithUser';

export const App = () => {
  const todosWithUser: TodoWithuser[] = todosFromServer
    .map((todo: Todo) => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    }));
  // console.log(typeof todosWithUser[0].user.id)
  const users = [...usersFromServer];

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label htmlFor="user">
            <select data-cy="userSelect" id="user">
              <option value="-1" disabled>Choose a user</option>
              {users.map(user => (
                <option value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todosWithUser} />
      </section>
    </div>
  );
};
