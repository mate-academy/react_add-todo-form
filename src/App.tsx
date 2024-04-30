import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoInterface } from './types/Todo';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [users, setUsers] = useState(usersFromServer);
  const [todos, setTodos] = useState(todosFromServer);

  const handleTodo = (todo: TodoInterface) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

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
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <TodoList todos={todos} />

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </div>
  );
};
