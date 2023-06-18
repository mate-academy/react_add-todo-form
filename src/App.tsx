import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number): User | null => {
  const findUser = usersFromServer.find((user) => (user.id === userId));

  return findUser || null;
};

const getTodoId = (listTodos: Todo[]): number => {
  const todosId = listTodos.map(todo => todo.id);

  return Math.max(...todosId) + 1;
};

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [listTodos, setListTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(event.target.value);
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setUser(Number(event.target.value));
  };

  const submit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!user) {
      setUserError(true);
    }

    if (title && user) {
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
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submit}
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
            onChange={changeTitle}
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
            onChange={changeUser}
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
