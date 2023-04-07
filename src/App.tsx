import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

const initialTodos = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [title, setTitle] = useState('');

  const handleClear = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !selectedUserId) {
      setErrorTitle(!title.trim());
      setErrorUser(!selectedUserId);

      return;
    }

    if (title.trim() && selectedUserId) {
      const newTodo: Todo = {
        id: Math.max(...todos.map((todo) => todo.id)) + 1,
        userId: selectedUserId,
        title,
        completed: false,
        user: getUserById(selectedUserId),
      };

      setTodos((prevTodo => [...prevTodo, newTodo]));

      handleClear();
    }
  };

  const handleChangeTittle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setErrorTitle(false);

    setTitle(value.replace(/[^A-Za-z\s\d\u0400-\u04FF]/g, ''));
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUserId(Number(value));
    setErrorUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleChangeTittle}
              placeholder="Enter a title"
            />
          </label>

          {errorTitle && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:
            <select
              data-cy="userSelect"
              id="userSelect"
              placeholder="Choose a user"
              value={selectedUserId}
              onChange={handleChangeUser}
            >
              <option value="0">
                Choose a user
              </option>

              {usersFromServer.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {errorUser && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
