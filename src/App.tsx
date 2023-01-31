import React, { useState } from 'react';
import { User } from './type/User';
import { Todo } from './type/Todo';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const giveUser = usersFromServer.find((user) => user.id === userId);

  return giveUser || null;
}

export const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [useError, setUseError] = useState(false);

  const newId = Math.max(...todos.map((todo) => todo.id)) + 1;

  const newTodo = () => {
    todos.push({
      id: newId,
      title,
      userId: selectedUser,
      completed: false,
      user: getUser(selectedUser),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUser) {
      setUseError(true);
    }

    if (title.trim().length === 0) {
      setTitleError(true);
    }

    if (title.trim().length > 0 && selectedUser) {
      newTodo();
      setTitle('');
      setUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={() => {
                setTitleError(false);
              }}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={(event) => {
                setUser(Number(event.target.value));
                setUseError(false);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {useError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
