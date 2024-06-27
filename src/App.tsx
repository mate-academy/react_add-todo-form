import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { Todo } from './types/totos';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [selectUserError, setSelectUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [allTodos, setAllTodos] = useState<Todo[]>(todos);

  const reset = () => {
    setTitle('');
    setSelectUser(0);
    setSelectUserError(false);
    setTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!selectUser) {
      setSelectUserError(true);
    }

    if (title && selectUser) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: +selectUser,
        user: usersFromServer.find(user => +selectUser === user.id) || null,
      };

      setAllTodos(prevTodos => [...prevTodos, newTodo]);
      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          Title:{' '}
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:{' '}
          <select
            data-cy="userSelect"
            value={selectUser}
            onChange={event => setSelectUser(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
