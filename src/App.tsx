import './App.scss';
import React, { useState } from 'react';
import users from './api/users';

export const App = () => {
  const [count, setCount] = useState(0);

  const [userId, setUserId] = useState(0);
  const [hasUserIdErrorMessage, setHasUserIdErrorMessage] = useState('');

  const [title, setTitle] = useState('');
  const [hasTitleErrorMessage, setHasTitleErrorMessage] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (hasTitleErrorMessage) {
      setHasTitleErrorMessage(''); // Убираем сообщение об ошибке, если пользователь начал вводить текст
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    if (hasUserIdErrorMessage) {
      setHasUserIdErrorMessage(''); // Убираем сообщение об ошибке, если пользователь выбрал пользователя
    }
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleErrorMessage('');
    setHasUserIdErrorMessage('');
    setCount(count + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title) {
      setHasTitleErrorMessage('Please enter a title');
      hasError = true;
    }

    if (!userId) {
      setHasUserIdErrorMessage('Please choose a user');
      hasError = true;
    }

    if (!title || !userId) {
      return;
    }

    if (!hasError) {
      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setHasTitleErrorMessage(' ')}
          />
          {hasTitleErrorMessage && (
            <span className="error">{hasTitleErrorMessage}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            required
            value={userId}
            onChange={handleUserChange}
            onBlur={() => setHasUserIdErrorMessage(' ')}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdErrorMessage && (
            <span className="error">{hasUserIdErrorMessage}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>
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
