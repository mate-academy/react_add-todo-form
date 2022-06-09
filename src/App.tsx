import './App.scss';

import React, { useState } from 'react';
import classNames from 'classnames';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import TodoList from './components/TodoList/TodoList';
import { Todo, User, PreparedTodo } from './react-app-env';

const prepare = (
  users: User[],
  todos: Todo[],
): PreparedTodo[] => {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
};

const App: React.FC = () => {
  const [selectUser, setSelectUser] = useState(0);
  const [titles, setTitles] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);
  const [user] = useState(usersFromServer);
  const [counter, setCounter] = useState(2);

  // eslint-disable-next-line no-console
  console.log(titles);
  // eslint-disable-next-line no-console
  console.log(isCompleted);
  // eslint-disable-next-line no-console
  console.log(selectUser);
  // eslint-disable-next-line no-console
  console.log(`userError: ${userError}`);
  // eslint-disable-next-line no-console
  console.log(`titleError: ${titleError}`);

  const addUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!titles && !selectUser) {
      setTitleError(true);
      setUserError(true);
    }

    if (!titles) {
      setTitleError(true);

      return;
    }

    if (!selectUser) {
      setUserError(true);

      return;
    }

    setTodos([...todos, {
      userId: +selectUser,
      id: todos.length + 1,
      title: titles,
      completed: isCompleted,
    }]);

    setTitles('');
    setSelectUser(0);
    setIsCompleted(false);
    setCounter((current) => current + 1);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitles(event.target.value);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setSelectUser(+event.target.value);
  };

  const preparedTodos = prepare(user, todos);

  return (
    <div className="todo">
      <div className="block">
        <h1 className="todo__h1 title is-4">Add todo form</h1>
        <p className="title is-6 is-spaced">{`Count of user: ${counter}`}</p>
        <form
          onSubmit={addUser}
          className="todo__form"
        >
          <div className="container">
            <div className="todo__input-title">
              <input
                type="text"
                id="title"
                placeholder="Enter the title"
                className={classNames('input is-primary',
                  {
                    'is-danger': titleError === true,
                  })}
                value={titles}
                onChange={handleTitle}
                maxLength={150}
              />
              {titleError && (
                <p className="todo__error-text">Please enter the title</p>
              )}
            </div>

            <div
              className={classNames('select is-primary todo__select-user',
                {
                  'is-danger': userError === true,
                })}
            >
              <select
                name="selectUser"
                value={selectUser}
                onChange={handleUser}
              >
                <option
                  value={0}
                  disabled
                >
                  Choose a user
                </option>
                {usersFromServer.map(user1 => (
                  <option
                    key={user1.id}
                    value={user1.id}
                  >
                    {user1.name}
                  </option>
                ))}
              </select>
              {userError && (
                <p className="todo__error-text">Please choose a user</p>
              )}
            </div>

            <label htmlFor="completed" className="checkbox">
              <input
                type="checkbox"
                id="completed"
                className="todo__completed"
                checked={isCompleted}
                onChange={() => setIsCompleted(!isCompleted)}
              />
              Completed
            </label>

            <button type="submit" className="button is-primary">Add</button>
          </div>
        </form>
      </div>
      <TodoList todos={preparedTodos} />

    </div>
  );
};

export default App;
