import React, { useState } from 'react';
import './App.scss';
import 'bulma';
import usersFromServer from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import getMaxTodosId from './services/todosServices';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todoList, setTodoList] = useState(todos);
  const [userIdError, setUserIdError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const newId = getMaxTodosId(todoList) + 1;
  const users = [...usersFromServer];

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  // eslint-disable-next-line
  const handlerOnChangeTitleField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  // eslint-disable-next-line
  const handlerOnChangeSelectField = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  // eslint-disable-next-line
  const handlerSubmit: React.ChangeEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();

    if (userId <= 0) {
      setUserIdError(true);
    } else {
      setUserIdError(false);
    }

    if (title.trim() === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if ((userId > 0) && (title.trim() !== '')) {
      setUserIdError(false);
      setTitleError(false);
    } else {
      return;
    }

    setTodoList([
      ...todoList,
      {
        id: newId,
        title,
        completed: false,
        userId,
      },
    ]);
    reset();
  };

  return (
    <div className="section">
      <h1 className="title">Add todo form</h1>

      <form
        name={`form ${newId}`}
        action="/api/todos"
        method="POST"
        onSubmit={handlerSubmit}
        className="box"
      >
        <div className="field">
          <div className="control">
            <input
              className="input input-length"
              id={`${newId}`}
              type="text"
              placeholder="Please enter a title"
              data-cy="titleInput"
              value={title}
              onChange={handlerOnChangeTitleField}
            />
            {titleError && <div className="error">Please enter a title</div>}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <div className="select">
              <select
                data-cy="userSelect"
                id={`selectFild ${newId}`}
                value={userId}
                onChange={handlerOnChangeSelectField}
              >
                <option value="0" disabled>Choose a user</option>
                {users.map(({ id, name }) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {name}
                  </option>
                ))}
              </select>
            </div>
            {userIdError && <div className="error">Please choose a user</div>}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button
              className="button is-link"
              id="submit"
              type="submit"
              data-cy="submitButton"
            >
              Add
            </button>
          </div>
        </div>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
