import React, { useState } from 'react';
import className from 'classnames';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import 'bulma/css/bulma.min.css';
import './App.scss';

export const App: React.FC = () => {
  const lastTodoId = (): number => {
    const sortedIdList = todosFromServer.map(item => item.id).sort(
      (id1, id2) => id1 - id2,
    );
    const lastId = sortedIdList.pop();

    return !lastId
      ? 1
      : lastId;
  };

  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [allTodos, setAllTodos] = useState([...todosFromServer]);
  const [todo, setTodo] = useState({
    id: lastTodoId(),
    title: '',
    userId: 0,
    completed: false,
  });

  const userList: string[] = [...usersFromServer].map(
    userFromServer => userFromServer.name,
  );

  const getUserById = (userId: number): User | null => {
    const foundUser = usersFromServer.find(
      userFromServer => userFromServer.id === userId,
    );

    return foundUser || null;
  };

  const todosList: Todo[] = allTodos.map(todoFromServer => ({
    ...todoFromServer,
    user: getUserById(todoFromServer.userId),
  }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.length === 0) {
      setErrorTitle(true);
    }

    if (title.length > 0) {
      setErrorTitle(false);
    }

    if (!user) {
      setErrorUser(true);
    }

    if (user) {
      setErrorUser(false);
    }

    if (title && user) {
      setAllTodos(state => ([...state, todo]));
      setUser('');
      setTitle('');
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    value = value.replace(
      /[!@#$%'`";:|^&*,.\\<>?/()_+={\][}-]/g, '',
    );

    setTitle(value);
    setErrorTitle(false);
  };

  return (
    <div className="App">
      <div className="box">
        <h1 className="title">
          Add todo form
        </h1>

        <form
          className="form"
          action="/api/users"
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="field">
            <label className="label">
              {'Title: '}
              <input
                className={className(
                  'input',
                  { 'is-danger': errorTitle },
                )}
                name="title"
                type="text"
                value={title}
                data-cy="titleInput"
                placeholder="Enter a title"
                onChange={(e) => handleTitle(e)}
              />
            </label>

            {errorTitle
            && (
              <span
                className="
                  error
                  help
                  is-danger"
              >
                Please enter a title
              </span>
            )}
          </div>

          <div className="field">
            <label className="label">
              {'User: '}
              <div className="control">
                <div
                  className={className(
                    'select',
                    {
                      'is-danger': errorUser && !user,
                      'is-link': user,
                    },
                  )}
                >
                  <select
                    className="select__input"
                    name="user"
                    data-cy="userSelect"
                    value={
                      !user
                        ? 0
                        : user
                    }
                    onChange={(e) => {
                      setUser(e.target.value);
                      setErrorUser(false);
                    }}
                  >
                    <option
                      value="0"
                      disabled
                    >
                      Choose a user
                    </option>
                    {userList.map((userItem, index) => (
                      <option
                        key={`${userItem}_${Math.random()}`}
                        value={index + 1}
                      >
                        {userItem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </label>

            {errorUser
            && (
              <span
                className="
                  error
                  help
                  is-danger"
              >
                Please choose a user
              </span>
            )}
          </div>

          <button
            className="
              button
              is-link"
            type="submit"
            data-cy="submitButton"
            onClick={() => {
              if (title && user) {
                (setTodo(state => (
                  {
                    id: state.id + 1,
                    title,
                    userId: +user,
                    completed: false,
                  }
                )));
              }
            }}
          >
            Add
          </button>
        </form>

        <TodoList todos={todosList} />
      </div>
    </div>
  );
};
