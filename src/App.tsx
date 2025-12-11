/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(u => u.id === todo.userId) as User,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || userId === 0) {
      setHasError(true);

      return;
    }

    const user = usersFromServer.find(u => u.id === userId);

    if (!user) {
      return;
    }

    const newId = todos.length > 0
      ? Math.max(...todos.map(t => t.id)) + 1
      : 1;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId: userId,
      completed: false,
      user: user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setUserId(0);
    setHasError(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title-input">
            Title
          </label>
          <div className="control">
            <input
              id="title-input"
              className={`input ${hasError && !title ? 'is-danger' : ''}`}
              type="text"
              placeholder="Enter todo title"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          {hasError && !title && (
            <span className='error help is-danger'>Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="user-select">
            User
          </label>
          <div className="control">
            <select
              id="user-select"
              className={`input ${hasError && userId === 0 ? 'is-danger' : ''}`}
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {hasError && userId === 0 && (
            <span className="error help is-danger">Please choose a user</span>
          )}
        </div>

        <div className="control">
          <button
            type="submit"
            className="button is-primary"
            data-cy="submitButton"
          >
            Add
          </button>
        </div>
      </form>

      <TodoList todos={todos}/>
    </div>
  );
};
