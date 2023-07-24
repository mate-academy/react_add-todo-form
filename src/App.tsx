import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';
import { User } from './types/User';

const getUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId)
  || null;
};

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) as User,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [hasError, setHasError] = useState({ title: false, userId: false });
  const [values, setValues] = useState({
    title: '',
    userId: 0,
  });

  const { title, userId } = values;

  const createNewId = () => {
    const allId = todos.map(todo => todo.id);

    return Math.max(...allId) + 1;
  };

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, title: e.target.value });

    setHasError({ ...hasError, title: false });
  };

  const handleUserIdSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({ ...values, userId: +e.target.value });

    setHasError({ ...hasError, userId: false });
  };

  const reset = () => {
    setHasError({ title: false, userId: false });

    setValues({
      title: '',
      userId: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasAnyError = false;

    if (title === '') {
      setHasError(prevState => ({ ...prevState, title: true }));
      hasAnyError = true;
    }

    if (userId === 0) {
      setHasError(prevState => ({ ...prevState, userId: true }));
      hasAnyError = true;
    }

    if (hasAnyError) {
      return;
    }

    const newTodo = {
      id: createNewId(),
      title,
      userId,
      completed: false,
      user: getUserById(userId) as User,
    };

    reset();

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleInput}
          />

          {hasError.title
            && (<span className="error">Please enter a title</span>) }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdSelect}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}

          </select>

          {hasError.userId
           && <span className="error">Please choose a user</span>}

        </div>

        <button
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
