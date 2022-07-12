import React, { useState } from 'react';
import classNames from 'classnames';

import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import User from './types/User';
import Todo from './types/Todo';

let currentUser: User;

export const preparedTodos: Todo[] = todosFromServer.map((todo) => {
  currentUser = users.find((user) => user.id === todo.userId) || currentUser;

  return {
    ...todo,
    user: currentUser,
  };
});

const App: React.FC = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleValid, setTitleValidity] = useState(true);
  const [isUserValid, setUserValidity] = useState(true);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = users.find((currUser) => currUser.id === userId);
    const fixedTitle = title.replace(/[^\w\d\s\u0430-\u044f]+/, '');

    setTitleValidity(!!fixedTitle);
    setUserValidity(!!userId);

    if (!title || !userId || !user) {
      return;
    }

    const newTodo: Todo = {
      userId,
      id: todos.length + 1,
      title: fixedTitle,
      completed: false,
      user,
    };

    setTitle('');
    setUserId(0);
    setTodos(todos.concat(newTodo));
  };

  return (
    <div className="App container">
      <h1>Todo form</h1>

      <form
        className="w-50 p-4 mx-auto mb-3 border rounded-2"
        onSubmit={onFormSubmit}
      >
        <div className="form-floating mb-3">
          <input
            id="titleInput"
            className={classNames({
              'form-control': true, 'is-invalid': !isTitleValid,
            })}
            type="text"
            name="title"
            value={title}
            data-cy="titleInput"
            placeholder="Title"
            onChange={(event) => {
              setTitleValidity(true);
              setTitle(event.target.value);
            }}
          />

          <label htmlFor="titleInput">Title</label>

          <div className="form-text" style={{ display: `${isTitleValid ? '' : 'none'}` }}>
            Only EN, RU letters, digits and spaces are allowed.
            Everything else will be skipped.
          </div>

          <div className="invalid-feedback">
            Please enter the title
          </div>
        </div>

        <div className="form-floating mb-3">
          <select
            id="userSelect"
            className={classNames({
              'form-select': true, 'is-invalid': !isUserValid,
            })}
            name="user"
            value={userId}
            data-cy="userSelect"
            onChange={(event) => {
              setUserValidity(true);
              setUserId(+event.target.value);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {users.map(currUser => (
              <option
                key={currUser.id}
                value={currUser.id}
              >
                {currUser.name}
              </option>
            ))}
          </select>

          <label htmlFor="userSelect">User</label>

          <div className="invalid-feedback">
            Please choose a user
          </div>
        </div>

        <button
          className="btn btn-primary w-100"
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
