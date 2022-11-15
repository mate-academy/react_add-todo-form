import './App.scss';
import React, { useState } from 'react';

import users from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

const findUserById = (userId: number): User | null => (
  users.find(user => user.id === userId) || null
);

const usersTodoList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(usersTodoList);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const trimmedLen = title.trim().length;

  const handleErrors = () => {
    if (!trimmedLen) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^A-Za-z\s]/g, ''));
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserError(false);
  };

  const revertDefault = (todo: Todo) => {
    setTodos(() => ([
      ...todos,
      todo,
    ]));
    setTitle('');
    setUserId(0);
    setCompleted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmedLen || !userId) {
      handleErrors();

      return;
    }

    const id = Math.max(...todos.map(todo => todo.id)) + 1;
    const user = users.find(u => u.id === userId) || null;

    const newTodo = {
      id,
      title,
      completed,
      userId,
      user,
    };

    revertDefault(newTodo);
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
          <label
            className="label"
            htmlFor="titleInput"
          >
            {'Title: '}
          </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
          />
          {titleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label
            className="label"
            htmlFor="titleInput"
          >
            {'User: '}
          </label>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <div className="field">
          <label htmlFor="completed" className="checkbox">
            {'Completed? '}
            <input
              id="completed"
              type="checkbox"
              name="completed"
              checked={completed}
              onChange={() => setCompleted(!completed)}
            />
          </label>
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
