import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import classNames from 'classnames';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  // const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);

      return;
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  return (
    <div className="App">
      <h1 className="title is-1">Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        className="box"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="todo-title" className="label">
            Title:
          </label>
          <div
            className={classNames('control', {
              ['has-icons-right']: hasTitleError,
            })}
          >
            <input
              type="text"
              data-cy="titleInput"
              id="todo-title"
              className={classNames('input', { ['is-danger']: hasTitleError })}
              value={title}
              onChange={handleTitleChange}
            />
            {hasTitleError && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            )}
          </div>
          {hasTitleError && <p className="error">Please enter a title</p>}
        </div>

        <div className="field">
          <label htmlFor="todo-user" className="label">
            User:
          </label>
          <select data-cy="userSelect" id="todo-user">
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
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
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
