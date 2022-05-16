import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

enum InitialTodo {
  Title = '',
  UserId = 0,
  UserName = '',
}

const App: React.FC = () => {
  const [todos, setCurTodos] = useState(todosFromServer);
  const [title, setTitle] = useState<string>(InitialTodo.Title);
  const [userId, setUserId] = useState<number>(InitialTodo.UserId);
  const [userName, setUserName] = useState<string>(InitialTodo.UserName);
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidUserName, setIsValidUserName] = useState(true);

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const regexp = /[^A-Za-z0-9А-ЯЄІЇа-яєії\s]/gi;
    const enteredTitle = event.target.value.replace(regexp, '');

    if (enteredTitle.trim().length > 0) {
      setTitle(enteredTitle);
      setIsValidTitle(true);
    }
  };

  const changeUserId = (event: ChangeEvent<HTMLSelectElement>) => {
    const user = event.target.value;
    const parsedUser = JSON.parse(user);

    setUserName(user);
    setUserId(parsedUser.id);
    setIsValidUserName(true);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    if (title === InitialTodo.Title) {
      setIsValidTitle(false);
    } else if (userName === InitialTodo.UserName) {
      setIsValidUserName(false);
    } else if (isValidTitle && isValidUserName) {
      const lastId = todos.length + 1;

      const newTodo = {
        userId,
        id: lastId,
        title,
        completed: false,
      };

      setCurTodos((prev) => [...prev, newTodo]);
      setTitle(InitialTodo.Title);
      setUserId(InitialTodo.UserId);
      setUserName(InitialTodo.UserName);
    }

    event.preventDefault();
  };

  return (
    <div className="app">
      <h1 className="app__header">Add todo form</h1>

      <form onSubmit={submitForm} className="app__form">
        <label className="app__input-label">
          <input
            type="text"
            name="title"
            value={title}
            onChange={changeTitle}
            placeholder="Title"
            className="app__input"
          />
          {
            !isValidTitle && (
              <span className="app__error">
                Please enter the title
              </span>
            )
          }
        </label>

        <label className="app__input-label">
          <select
            name="users"
            id="usersSelect"
            value={userName}
            onChange={changeUserId}
            title="Please choose a user"
            className="app__input"
          >
            <option
              value={InitialTodo.UserName}
              disabled
            >
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={JSON.stringify(user)}>
                {user.name}
              </option>
            ))}
          </select>
          {
            !isValidUserName && (
              <span className="app__error">
                Please choose a user
              </span>
            )
          }
        </label>

        <button
          type="submit"
          className="app__input app__button"
        >
          Add
        </button>
      </form>

      <h2 className="app__list-header">Users tasks</h2>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
