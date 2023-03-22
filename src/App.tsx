import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserIdValid, setIsUserIdValid] = useState(true);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsTitleValid(Boolean(title));
    setIsUserIdValid(Boolean(userId));

    if (title && userId) {
      window.console.log('Data valid!');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="todoTitle">
            {'Title: '}
            <input
              type="text"
              name="title"
              id="todoTitle"
              placeholder="Ener a title"
              data-cy="titleInput"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          {!isTitleValid && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todoUser">
            {'User: '}
            <select
              id="todoUser"
              data-cy="userSelect"
              value={userId}
              onChange={(event) => setUserId(Number(event.target.value))}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {!isUserIdValid && (
              <span className="error">
                Please choose a user
              </span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">
            delectus aut autem
          </h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section>
    </div>
  );
};
