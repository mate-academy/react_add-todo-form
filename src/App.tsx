import { FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(() => preparedTodos);
  const [totoTitle, setTotoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!totoTitle) {
      setHasTitleError(true);
    }

    if (!selectedUser) {
      setHasUserError(true);
    }

    if (totoTitle && selectedUser) {
      setTodos((prevTodos) => [...prevTodos, {
        id: Math.max(...prevTodos.map(todo => todo.id)) + 1,
        userId: selectedUser,
        title: totoTitle,
        completed: false,
        user: getUser(selectedUser) || null,
      }]);

      setTotoTitle('');
      setSelectedUser(0);
    }
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={totoTitle}
            onChange={(event) => {
              setTotoTitle(event.target.value);
              if (hasTitleError) {
                setHasTitleError(false);
              }
            }}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(Number(event.target.value));
              if (hasUserError) {
                setHasUserError(false);
              }
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>
          {hasUserError && (
            <span className="error">Please choose a user</span>
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
