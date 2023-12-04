import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { getMaxId, getUser, preparedTodoList } from './helpers';
import { Todo } from './types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodoList);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [select, setSelect] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  const handleTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelect(+event.target.value);
    setHasSelectError(false);
  };

  const reset = () => {
    setTitle('');
    setHasTitleError(false);

    setSelect(0);
    setHasSelectError(false);
  };

  const hasAllFields = title.trim() && select;

  const handleChange = (event: React.FormEvent) => {
    event.preventDefault();

    setHasSelectError(!select);
    setHasTitleError(!title);

    if (!hasAllFields) {
      return;
    }

    const newTodo: Todo = {
      id: getMaxId(todos),
      title,
      completed: false,
      userId: select,
      user: getUser(select),
    };

    setTodos(currentTodo => (
      [...currentTodo, newTodo]
    ));

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={(event) => handleTitle(event)}
            required
          />
          {hasTitleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={select}
            defaultValue={0}
            onChange={handleSelect}
            required
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleChange}
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
