import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const todosWithusersFromServer: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: (usersFromServer.find(user => user.id === todo.userId) || null),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosWithusersFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({
    titleError: false,
    userError: false,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim().length) {
      setErrors((current) => ({
        ...current,
        titleError: true,
      }));
    }

    if (!userId) {
      setErrors((current) => ({
        ...current,
        userError: true,
      }));
    }

    if (!title.trim().length || !userId) {
      return;
    }

    const newTodo: Todo = {
      title,
      userId,
      completed,
      id: (Math.max(...todos.map(todo => todo.id)) + 1),
      user: usersFromServer.find(user => user.id === userId) || null,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
    setCompleted(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.replace(/[^A-Za-z-А-Яа-я-іІїЇєЄ\s]/g, ''));
    setErrors((current) => ({
      ...current,
      titleError: false,
    }));
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setErrors((current) => ({
      ...current,
      userError: false,
    }));
  };

  return (
    <div className="App container is-flex">
      <form onSubmit={onSubmit}>
        <div className="field pr-2">
          <label className="label" htmlFor="titleInput">
            {'Title: '}
          </label>
          <div className="control">
            <input
              id="titleInput"
              data-cy="titleInput"
              className="input"
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={handleInput}
            />
            {
              errors.titleError
                && <span className="error">Please enter a title</span>
            }
          </div>
        </div>

        <div className="field pr-2">
          <label htmlFor="userSelect" className="label">
            {'User: '}
          </label>
          <div className="control">
            <div className="select">
              <select
                id="userSelect"
                data-cy="userSelect"
                value={userId}
                onChange={handleSelect}
              >
                <option value="0" disabled>Choose a user</option>
                {usersFromServer.map(user => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {
            errors.userError
              && <span className="error">Please choose a user</span>
          }
        </div>

        <div className="field">
          <div className="control">
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
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              data-cy="submitButton"
              className="button is-link"
            >
              Add
            </button>
          </div>
        </div>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
