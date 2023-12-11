import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

function getTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasNoTitleError, setHasNoTitleError] = useState(true);
  const [hasNoUserIdError, setHasNoUserIdError] = useState(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasNoTitleError(true);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasNoUserIdError(true);
  };

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    let hasNoError = true;

    if (!title.trim()) {
      setHasNoTitleError(false);
      hasNoError = false;
    }

    if (userId === 0) {
      setHasNoUserIdError(false);
      hasNoError = false;
    }

    if (!hasNoError) {
      return;
    }

    const newTodo: Todo = {
      id: getTodoId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            pattern="^[a-zA-Z0-9\sА-Яа-яіІєЄїЇґҐ  ]*$"
            placeholder="Please enter a title"
            onChange={handleTitleChange}
          />
          {!hasNoTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>

          {!hasNoUserIdError && (
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
