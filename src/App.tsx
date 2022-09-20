import './App.scss';
import 'bulma/css/bulma.min.css';
import classNames from 'classnames';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const visibleTodos: Todo[] = todosFromServer
  .map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

const todosId = visibleTodos.map(({ id }) => id);

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isCorrectUser, setIsCorrectUser] = useState(true);
  const [isCorrectTitle, setIsCorrectTitle] = useState(true);

  const getTodo = (): void => {
    const newTodo: Todo = {
      id: Math.max(...todosId) + 1,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    visibleTodos.push(newTodo);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsCorrectTitle(true);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+(event.target.value));
    setIsCorrectUser(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setIsCorrectUser(false);
    }

    if (!title.trim()) {
      setIsCorrectTitle(false);
    }

    if (!userId || !title.trim()) {
      return;
    }

    getTodo();

    setUserId(0);
    setTitle('');
    setIsCorrectTitle(true);
    setIsCorrectUser(true);
  };

  return (
    <div className="App box">
      <h1 className="title">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
        className="field"
      >
        <div className="field column is-two-fifths">
          <label className="label">
            <span>{'Title: '}</span>
            <input
              type="text"
              data-cy="titleInput"
              className="input is-link "
              value={title}
              placeholder="Enter a title"
              onChange={handleChangeTitle}
            />
            {
              isCorrectTitle
              || <span className="error">Please enter a title</span>
            }
          </label>
        </div>

        <div className="field column is-half">
          <label className="label">

            <p>{'User: '}</p>
            <div className="select is-norma">
              <select
                data-cy="userSelect"
                defaultValue={userId}
                value={userId}
                onChange={handleChangeUser}
              >
                <option value="0" disabled>Choose a user</option>

                {
                  usersFromServer.map(({ name, id }) => (
                    <option
                      value={id}
                      key={id}
                    >
                      {name}
                    </option>
                  ))
                }
              </select>
            </div>
          </label>

          {
            isCorrectUser
            || <span className="error">Please choose a user</span>
          }
        </div>
        <div className="buttons column">
          <button
            type="submit"
            data-cy="submitButton"
            className={classNames('button is-primary is-focused',
              {
                'is-danger': isCorrectTitle === false
                || isCorrectUser === false,
              })}
          >
            Add
          </button>
        </div>

      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
