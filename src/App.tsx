import { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

const todosFormServer: Todo[] = [...todosFromServer];

export const App = () => {
  const [titleInput, setTitleInput] = useState('');
  const [userSelected, setUserSelected] = useState(0);
  const [newTodos, setNewTodos] = useState(todosFormServer);
  const [errorMessegaTitle, setErrorMessageTitle] = useState(false);
  const [errorMessageUser, setErrorMessageUser] = useState(false);

  function handleErrorMessageTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessageTitle(false);
    setTitleInput(event.target.value);
  }

  function handleErrorMessageUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setErrorMessageUser(false);
    setUserSelected(+event.target.value);
  }

  function createTodo(
    id: number, title: string, completed: boolean, userId: number,
  ) {
    const newTodo = {
      id,
      title,
      completed,
      userId,
    };

    setNewTodos([...newTodos, newTodo]);
  }

  function handleSumbmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessageTitle(!titleInput.trim());
    setErrorMessageUser(!userSelected);

    if (titleInput.trim() && userSelected) {
      createTodo(
        newTodos.length + 1,
        titleInput,
        false,
        userSelected,
      );
      setTitleInput('');
      setUserSelected(0);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSumbmit}
      >
        <div className="field">
          <label htmlFor="input">
            <span>Title: </span>
          </label>

          <input
            type="text"
            id="input"
            data-cy="titleInput"
            value={titleInput}
            placeholder="Enter a title"
            onChange={handleErrorMessageTitle}
          />

          {errorMessegaTitle
           && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <label htmlFor="select">
            <span>User: </span>
          </label>

          <select
            data-cy="userSelect"
            id="select"
            value={userSelected}
            onChange={handleErrorMessageUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({
              username, id, name,
            }) => {
              return (
                <option
                  value={id}
                  key={username}
                >
                  {name}
                </option>
              );
            })}
          </select>

          {errorMessageUser
           && <span className="error">Please choose a user</span>}

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

        {newTodos.map((todo, index) => {
          const userOfCurrentTodo = usersFromServer.find(
            user => user.id === todo.userId,
          ) || {
            name: 'unknow user',
            email: '@',
            completed: false,
          };

          return (
            <article
              data-id={index + 1}
              className={
                cn(
                  'TodoInfo',
                  { 'TodoInfo--completed': todo.completed },
                )
              }
              key={todo.title}
            >
              <h2 className="TodoInfo__title">
                {todo.title}
              </h2>

              <a
                className="UserInfo"
                href={`mailto:${userOfCurrentTodo.email}`}
              >
                {userOfCurrentTodo.name}
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
};
