import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User, Todo } from './components/types';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId) || null,
    })),
  );

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserIdError] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const user = getUserById(userId);

    if (user) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(todo => todo.id), 0) + 1,
        title: title.trim(),
        user,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <label htmlFor="todotitle" className="label">
              Title:{' '}
              <input
                id="todotitle"
                value={title}
                type="text"
                data-cy="titleInput"
                placeholder="Enter a title"
                onChange={handleTitleChange}
              />
            </label>
            {titleError && <span className="error">Please enter a title</span>}
          </div>
        </div>

        <div className="field">
          <div className="select is-danger">
            <label className="label" htmlFor="todo-user-id">
              User:{' '}
              <select
                id="todo-user-id"
                data-cy="userSelect"
                onChange={handleUserIdChange}
                value={userId}
              >
                <option value="0" disabled>
                  Choose a user
                </option>
                {usersFromServer.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            {userError && <span className="error">Please choose a user</span>}
          </div>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
