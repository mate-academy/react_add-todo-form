import React, { useState, FormEvent } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.min.css';
import './App.scss';

import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const getMaxId = (todos: Todo[]) => Math.max(...todos.map(todo => todo.id));

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(-1);
  const [completed, setCompleted] = useState(false);
  const [isInvalidTitle, setTitleCondition] = useState(false);
  const [isInvalidUser, setUserCondition] = useState(false);

  const handleTitle = (action: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(action.target.value.replace(/[^a-z0-9а-я ]/gi, ''));
    setTitleCondition(false);
  };

  const handleUser = (action: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+action.target.value);
    setUserCondition(false);
  };

  const handleCompleted = (action: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(action.target.checked);
  };

  const makeNewTodo = (action: FormEvent) => {
    action.preventDefault();

    setTitleCondition(title.length === 0);
    setUserCondition(user === -1);

    if (title.length !== 0 && user !== -1) {
      setTodos([
        {
          id: getMaxId(todos) + 1,
          title,
          completed,
          userId: usersFromServer[user - 1].id,
          user: usersFromServer[user - 1],
        },
        ...todos,
      ]);

      setTitle('');
      setUser(-1);
      setCompleted(false);
    }
  };

  return (
    <div
      className="App container is-max-desktop block"
    >
      <h1 className="subtitle is-4">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={makeNewTodo}
      >
        {isInvalidTitle && (
          <span className="tag is-danger mb-2">Please enter a title</span>
        )}

        <div className="field">
          <input
            className={cn('input',
              'is-primary',
              { 'is-danger': isInvalidTitle })}
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
            placeholder="Please enter a title"
          />
        </div>

        {isInvalidUser && (
          <span className="tag is-danger mb-2">Please choose a user</span>
        )}

        <div className={cn('select',
          'field',
          'is-primary',
          { 'is-danger': isInvalidUser })}
        >
          <select
            data-cy="userSelect"
            value={user}
            onChange={handleUser}
          >
            <option value={-1} disabled>Choose a user</option>

            {usersFromServer.map(person => (
              <option value={person.id} key={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field checkbox">
          <label className="field__label">
            Completed:
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCompleted}
            />
          </label>
        </div>

        <button
          className="button is-primary"
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
