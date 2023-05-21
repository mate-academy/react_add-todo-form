import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

type Todo = {
  title: string,
  user: string,
};

const todos: Todo[] = [{
  title: 'title',
  user: 'user',
}];

export const App = () => {
  const [titleInput, setTitleInput] = useState('');
  const [userSelected, setUserSelected] = useState('');

  function addTodo(title: string, user: string) {
    const newTodo = {
      title,
      user,
    };

    todos.push(newTodo);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(titleInput, userSelected);
        }}
      >
        <div className="field">
          <input
            type="text"
            id="input"
            data-cy="titleInput"
            value={titleInput}
            onChange={({ target }) => (setTitleInput(target.value))}
            placeholder="Please enter a title"
          />

          <label htmlFor="input">
            <span className="error">Please enter a title</span>
          </label>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            id="select"
            value={userSelected}
            onChange={
              ({ currentTarget }) => (setUserSelected(currentTarget.value))
            }
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(({ id, username, name }) => {
              return (
                <option value={name} key={id}>
                  {username}
                </option>
              );
            })}
          </select>

          <label htmlFor="select">
            <span className="error">Please choose a user</span>
          </label>

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
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

        {todos.map((todo, index) => {
          return (
            <article
              data-id={index}
              className="TodoInfo"
              key={todo.title}
            >
              <h2 className="TodoInfo__title" key={todo.title}>
                {todo.title}
              </h2>

              <a
                className="UserInfo"
                href="mailto:Julianne.OConner@kory.org"
                key={todo.user}
              >
                {todo.user}
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
};
