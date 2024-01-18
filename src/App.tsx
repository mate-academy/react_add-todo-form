import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './components/types';

const findById = (id:number) => {
  return usersFromServer.find(user => user.id === id) as User;
};

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectUser, setSelectUser] = useState(0);
  const [hasSelectUserError, setHasSelectUserError] = useState(false);

  const defaultTodos = todos.map(todo => {
    return {
      ...todo,
      user: findById(todo.userId),
    };
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const reset = () => {
    setTitle('');
    setSelectUser(0);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUser(+event.target.value);
    setHasSelectUserError(false);
  };

  const todoId = (todosArr:Todo[]) => {
    const maxId = Math.max(
      ...todosArr.map(todo => todo.id),
    );

    return maxId + 1;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      setTitle('');
      setHasTitleError(true);
    }

    if (!selectUser) {
      setHasSelectUserError(true);
    }

    if (title.trim() && selectUser) {
      setTodos([
        ...todos,
        {
          id: todoId(todos),
          title,
          completed: false,
          userId: selectUser,
        },
      ]);
      reset();
    }
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
          <span>Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span>User: </span>
          <select
            data-cy="userSelect"
            value={selectUser}
            onChange={handleSelectChange}
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

          {hasSelectUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={defaultTodos}
        // users={usersFromServer}
      />
    </div>
  );
};
