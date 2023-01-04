import './App.scss';
import { useEffect, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [checkInput, setCheckInput] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState([...todosFromServer]);

  useEffect(() => {
    if (Boolean(titleInput.trim().length) && Boolean(+userSelect)) {
      setCheckInput(true);
    }

    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(titleInput.length)) {
      setIsTitleError(false);
    }

    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(+userSelect)) {
      setIsUserError(false);
    } else {
      setCheckInput(false);
    }
  }, [titleInput, userSelect]);

  const addTodo = () => {
    if (checkInput && Boolean(titleInput.trim().length)) {
      const id = Math.max(...visibleTodos.map(todo => todo.id));
      const newTodo = {
        id: id + 1,
        title: titleInput,
        userId: +userSelect,
        completed: false,
      };

      setVisibleTodos([
        ...visibleTodos, newTodo,
      ]);

      setTitleInput('');
      setUserSelect(0);
    }

    if (titleInput.trim().length === 0) {
      setIsTitleError(true);
    }

    if (+userSelect === 0) {
      setIsUserError(true);
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
            placeholder="Enter a title"
            value={titleInput}
            onChange={(event) => {
              setTitleInput(event.target.value);
            }}
          />
          {
            isTitleError
            && (<span className="error">Please enter a title</span>)
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={(event) => {
              setUserSelect(+event.target.value);
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option
                key={id}
                value={id}
              >
                {name}
              </option>
            ))}
          </select>
          {isUserError && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="button"
          data-cy="submitButton"
          onClick={addTodo}
        >
          Add
        </button>
      </form>

      <section className="TodoList">

        {visibleTodos.map(({
          userId, id, completed, title,
        }) => {
          const { name, email } = usersFromServer.find((user) => {
            return user.id === userId;
          }) || usersFromServer[0];

          return (
            <article
              key={id}
              data-id={id}
              className={`TodoInfo ${completed ? ' TodoInfo--completed' : ''}`}
            >
              <h2 className="TodoInfo__title">
                {title}
              </h2>

              <a className="UserInfo" href={`mailto:${email}`}>
                {name}
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
};
