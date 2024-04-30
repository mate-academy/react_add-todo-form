import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todoInfo, setTodoInfo] = useState({
    title: '',
    userId: 0,
    users: usersFromServer,
    todos: todosFromServer,
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInfo(prevTodoInfo => ({
      ...prevTodoInfo,
      title: event.target.value,
    }));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            onChange={handleTitleChange}
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select data-cy="userSelect">
            <option value={todoInfo.userId} disabled>
              Choose a user
            </option>
            {todoInfo.users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoInfo.todos} />
    </div>
  );
};
