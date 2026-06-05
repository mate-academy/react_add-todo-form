import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
// import { title } from 'process';

export const App = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  // const [users, setUsers] = useState([...usersFromServer]);
  const users = [...usersFromServer];
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const isActive = title.trim() && user;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !title.trim()) {
      return;
    }

    const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    const todo = {
      id: newId,
      title: title,
      completed: false,
      userId: 0,
    };
    const whatToDo = [...todos];

    whatToDo.push({ ...todo });
    setTodos(whatToDo);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          {title.trim().length === 0 ? (
            <span className="error"> Please enter a title</span>
          ) : (
            ''
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            onChange={e => setUser(e.target.value)}
            defaultValue={0}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {[...users].map(el => {
              return (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
          {!user ? <span className="error"> Please choose a user</span> : ''}
        </div>

        <button type="submit" data-cy="submitButton" disabled={!isActive}>
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
