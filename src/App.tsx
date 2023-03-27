import React, { useState, useEffect, ChangeEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const getUserByName = (username: string) => {
  const foundUser = usersFromServer.find(user => user.name === username);

  return foundUser || null;
};

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const [values, setValues] = useState({
    user: '',
    title: '',
    id: 16,
    completed: false,
  });

  const [todo, setTodo] = useState<Todo>({
    id: 0,
    userId: 0,
    title: '',
    completed: false,
    user: null,
  });

  const {
    user,
    title,
    id,
    completed,
  } = values;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    const addUser = getUserByName(user);

    if (user.length > 0) {
      setErrorUser(false);
    }

    if (title.length > 0) {
      setErrorTitle(false);
    }

    setTodo({
      ...todo,
      id,
      userId: addUser !== null ? addUser.id : 0,
      title,
      completed,
      user: getUserByName(user),
    });
  }, [title, user]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!user || !title) {
      setErrorUser(Boolean(!user));
      setErrorTitle(Boolean(!title));

      return;
    }

    if (user === '0') {
      setErrorUser(true);

      return;
    }

    if (title.trim().length === 0) {
      setErrorTitle(Boolean(title));

      return;
    }

    setValues({
      ...values,
      user: '',
      title: '',
      id: id + 1,
    });

    setVisibleTodos([
      ...visibleTodos,
      todo,
    ]);
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
          <label>
            Title:
            {' '}
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Please enter a title"
            />
          </label>
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              name="user"
              data-cy="userSelect"
              value={values.user || '0'}
              onChange={handleChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(userFromServer => (
                <option
                  value={userFromServer.name}
                  key={userFromServer.id}
                >
                  {userFromServer.name}
                </option>
              ))}
            </select>
          </label>
          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
