/* eslint-disable no-console */
import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('0');
  const [visibleTodos, setVisibleTodos] = useState(todosFromServer);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleTitle = (value: string) => {
    setErrorTitle(false);
    const re = /^[A-Za-z0-9а-яА-ЯёЁіІїЇ ]+$/;

    if (re.test(value) || value === '') {
      setTitle(value);
    }
  };

  const newTodoId = () => {
    const arrayTodoId = visibleTodos.map(todo => todo.id);
    const id = Math.max(...arrayTodoId) + 1;

    return id;
  };

  const clearState = () => {
    setTitle('');
    setUser('0');
  };

  const errors = () => {
    if (user === '0') {
      setErrorUser(true);
    }

    if (!title) {
      setErrorTitle(true);
    }
  };

  const buttonSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    errors();
    if (user === '0' || !title) {
      return;
    }

    const userObject = usersFromServer
      .find(userName => userName.name === user);

    if (!userObject) {
      return;
    }

    const newTodo = {
      id: newTodoId(),
      title,
      completed: false,
      userId: userObject.id,
    };

    setVisibleTodos(state => (
      [
        ...state,
        newTodo,
      ]
    ));
    clearState();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            name="title"
            onChange={(e) => {
              handleTitle(e.target.value);
            }}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            name="user"
            onChange={(e) => {
              setUser(e.target.value);
              if (e.target.value !== '0') {
                setErrorUser(false);
              }
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(userObj => (
              <option
                value={userObj.name}
                key={userObj.id}
              >
                {userObj.name}
              </option>
            ))}
          </select>

          {errorUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={(e) => {
            buttonSubmit(e);
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
