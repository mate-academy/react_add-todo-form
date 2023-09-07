import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const preparedTodos:Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: usersFromServer
    .find(({ id }) => id === todo.userId) || null,
}));

// eslint-disable-next-line no-console
console.log(preparedTodos);

export const App = () => {
  const [visibleTodos] = useState(preparedTodos);
  const [todoTitle, setTodoTitle] = useState('');
  // const [userId, setUserId] = useState(0);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={event => event.preventDefault()}
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            onChange={(event) => setTodoTitle(event.target.value)}
          />
          <span>{todoTitle}</span>
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select data-cy="userSelect">
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value="0">{user.name}</option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
