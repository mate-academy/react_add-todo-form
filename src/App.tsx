import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import classNames from 'classnames';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [valueSelect, setValueSelect] = useState(0);
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9 ]/g,
      '',
    );

    setTitle(newValue);

    if (errorTitle) {
      setErrorTitle(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValueSelect(Number(event.target.value));

    if (errorUser) {
      setErrorUser(false);
    }
  };

  const findUser = (id: number): User | undefined => {
    return usersFromServer.find(user => user.id === id);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleInvalid = title.trim() === '';
    const isUserInvalid = valueSelect === 0;

    if (isTitleInvalid || isUserInvalid) {
      setErrorTitle(isTitleInvalid);
      setErrorUser(isUserInvalid);

      return;
    }

    const selectedUser = findUser(valueSelect);

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: title.trim(),
      completed: false,
      userId: valueSelect,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setValueSelect(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            id="title"
            placeholder="Enter title"
            onChange={event => handleTitleChange(event)}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={valueSelect}
            onChange={event => handleUserChange(event)}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => {
          const user = findUser(todo.userId);

          return (
            <article
              data-id={todo.id}
              key={todo.id}
              className={classNames('TodoInfo', {
                'TodoInfo--completed': todo.completed,
              })}
            >
              <h2 className="TodoInfo__title">{todo.title}</h2>
              <a className="UserInfo" href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
};
