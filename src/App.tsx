import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const getUserById = (userId: number): User | null => {
  const findUser = usersFromServer.find((user) => (user.id === userId));

  return findUser || null;
};

export const getTodoId = (listTodos: Todo[]): number => {
  const todosId = listTodos.map(todo => todo.id);

  return Math.max(...todosId) + 1;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [listTodos, setListTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''));
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setUser(Number(event.target.value));
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!user) {
      setUserError(true);
    }

    if (!title.trim() || !user) {
      return;
    }

    const newTodo: Todo = {
      id: getTodoId(listTodos),
      title,
      userId: user,
      completed: false,
      user: getUserById(user),
    };

    setListTodos(prevlist => [...prevlist, newTodo]);
    setTitle('');
    setUser(0);
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
          <label htmlFor="textId">
            Title:
          </label>
          <input
            type="text"
            id="textId"
            data-cy="titleInput"
            name="Enter a title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="usertId">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="usertId"
            name="user"
            value={user}
            onChange={handleUserChange}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(userFromServer => (
              <option
                key={userFromServer.id}
                value={userFromServer.id}
              >
                {userFromServer.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={listTodos} />
    </div>
  );
};
