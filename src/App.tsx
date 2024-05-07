import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './interfaces/Todo';
import React, { useState } from 'react';
import { getUserById } from './services/user';

const initialTodos: TodoWithUser[] = todosFromServer.map(todo => {
  return { ...todo, user: getUserById(usersFromServer, todo.userId) };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const [todos, setTodos] = useState<TodoWithUser[]>(initialTodos);

  const createTodo = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const newTodo: TodoWithUser = {
      title,
      completed: false,
      userId,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      user: getUserById(usersFromServer, userId),
    };

    if (!title.trim()) {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserIdError(true);
    }

    if (title.trim() && userId !== 0) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  const handlerSelectUser = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+evt.target.value);
    setUserIdError(false);
  };

  const handlerTitleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
    setTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={createTodo}>
        <div className="field">
          <label>
            Title:
            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handlerTitleOnChange}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handlerSelectUser}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(({ id, name }) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
