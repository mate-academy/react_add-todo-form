import './App.scss';
import { useEffect, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [checkInput, setCheckInput] = useState(false);
  const [showSpanTitle, setShowSpanTile] = useState(false);
  const [showSpanUser, setShowSpanUser] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState([...todosFromServer]);

  useEffect(() => {
    if (titleInput.length !== 0 && +userSelect !== 0) {
      setCheckInput(true);
    }

    if (titleInput.length !== 0) {
      setShowSpanTile(false);
    }

    if (+userSelect !== 0) {
      setShowSpanUser(false);
    } else {
      setCheckInput(false);
    }
  });

  const addTodo = () => {
    if (checkInput) {
      const id = Math.max(...visibleTodos.map(todo => todo.id));

      const newTodo = {
        id: id + 1,
        title: titleInput,
        userId: +userSelect || 0,
        completed: false,
      };

      // return visibleTodos;
      setVisibleTodos([
        ...visibleTodos, newTodo,
      ]);

      setTitleInput('');
      setUserSelect('0');
    }

    if (titleInput.length === 0) {
      setShowSpanTile(true);
    }

    if (+userSelect === 0) {
      setShowSpanUser(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            onChange={(event) => {
              setTitleInput(event.target.value);
            }}
          />
          {
            showSpanTitle
              ? <span className="error">Please enter a title</span>
              : <></>
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect || '0'}
            onChange={(event) => {
              setUserSelect(event.target.value);
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {
              usersFromServer.map(
                (user) => {
                  return (
                    <option
                      key={user.id}
                      value={user.id}
                    >
                      {user.name}
                    </option>
                  );
                },
              )
            }
          </select>
          {showSpanUser
            ? <span className="error">Please choose a user</span>
            : <></>}
        </div>

        <button
          type="button"
          data-cy="submitButton"
          onClick={() => {
            addTodo();
          }}
        >
          Add
        </button>
      </form>

      <section className="TodoList">

        {visibleTodos.map((todo) => {
          const todoUser = usersFromServer.filter((user) => {
            return user.id === todo.userId;
          });

          return (
            <article
              key={todo.id}
              data-id={todo.id}
              className={`TodoInfo ${todo.completed ? ' TodoInfo--completed' : ''}`}
            >
              <h2 className="TodoInfo__title">
                {todo.title}
              </h2>

              <a className="UserInfo" href={`mailto:${todoUser[0].email}`}>
                {todoUser[0].name}
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
};
