import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorTittle, setErrorTittle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const collectId = todos.map(todo => todo.id);

  const maxId = Math.max(...collectId) + 1;

  const handleAddUser = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId === 0 || title === '') {
      setErrorTittle(title === '');
      setErrorUser(userId === 0);

      return;
    }

    const newTodo = {
      id: maxId,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    todos.push(newTodo);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddUser}
      >
        <div>
          <label>
            <span>Title: </span>

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setErrorTittle(false);
              }}
            />
          </label>
          {errorTittle && <span className="error">Please enter a title</span>}
        </div>

        <div>
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(Number(event.target.value));
                setErrorUser(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option value={id}>{name}</option>
              ))}

            </select>
          </label>
          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
