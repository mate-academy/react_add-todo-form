import React, { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const preparedTodos = todosFromServer.map(todoItem => {
  return {
    ...todoItem,
    user: usersFromServer.find((user) => user.id === todoItem.userId) || null,
  };
});

export const App: React.FC = React.memo(() => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasTitleError, setTitleError] = useState(false);

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const changeNameHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setHasNameError(false);
  };

  const addNewTodo = () => {
    const newUser = usersFromServer.find(user => user.name === userName) || null;
    let userId = 0;

    if (newUser) {
      userId = newUser.id;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId,
      completed: false,
      user: newUser,
    };

    setTodos([...todos, newTodo]);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userName || !title) {
      setHasNameError(!userName);
      setTitleError(!title);

      return;
    }

    addNewTodo();

    setTitle('');
    setUserName('');
  };

  return (
    <div className="app">
      <h1 className="app__title">Add todo form</h1>

      <form className="app__form" onSubmit={submitHandler}>
        <label className="app__label" htmlFor="title">
          <input
            className="app__input"
            type="text"
            id="title"
            placeholder="Add title"
            value={title}
            onChange={changeTitleHandler}
          />
          {hasTitleError && (
            <span className="app__error-text">
              Please enter the title
            </span>
          )}
        </label>

        <label className="app__label" htmlFor="selectUser">
          <select
            className="app__input"
            value={userName}
            id="selectUser"
            onChange={changeNameHandler}
          >
            <option value="">
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasNameError && (
            <span className="app__error-text">
              Please choose a user
            </span>
          )}
        </label>

        <button className="app__button" type="submit">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
});
