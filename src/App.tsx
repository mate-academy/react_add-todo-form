import React, { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { getUserById } from './utils';
import { Todo } from './types/todo';

import './App.scss';

const preparedTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.id),
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserEmpty, setIsUserEmpty] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEmpty(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      setIsTitleEmpty(true);
    }

    if (!userId) {
      setIsUserEmpty(true);
    }

    if (title && userId) {
      setTodos(currTodos => ([
        ...currTodos,
        {
          id: Math.max(...currTodos.map(todo => todo.id)) + 1,
          title,
          completed: false,
          userId,
          user: getUserById(userId),
        },
      ]));

      resetForm();
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserEmpty(false);
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {isTitleEmpty && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          <select
            value={userId}
            data-cy="userSelect"
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserEmpty && (
            <span className="error">Please choose a user</span>
          )}

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
