import { FormEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [userId, setUserId] = useState(0);
  const [isError, setIsError] = useState(false);

  const resetTodos = () => {
    setTitle('');
    setUserId(0);
    setIsError(false);
  };

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId === 0 || !title) {
      setIsError(true);

      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title,
      userId,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    resetTodos();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <span className="error">
            {isError && !title ? 'Please choose a user' : ''}
          </span>
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => setUserId(+event.target.value)}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">
            {isError && !userId ? 'Please choose a user' : ''}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
