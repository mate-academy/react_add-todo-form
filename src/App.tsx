import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type TodoFromServer = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Todo = TodoFromServer & {
  user: User;
};

export const App = () => {
  const [todos] = useState<Todo[]>(
    todosFromServer
      .map(todo => {
        const user = usersFromServer.find(u => u.id === todo.userId);

        if (!user) {
          return null;
        }

        return {
          ...todo,
          user,
        };
      })
      .filter((todo): todo is Todo => todo !== null),
  );

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            name="title"
            placeholder="Enter todo title"
            data-cy="titleInput"
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select id="userSelect" name="user" data-cy="userSelect">
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
