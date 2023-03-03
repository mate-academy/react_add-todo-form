import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [titleElement, titleElementEdit] = useState('');
  const [userElement, userElementEdit] = useState('0');
  const [isErrorClick, isErrorClickEdit] = useState(false);
  const [visibleTodosFromServer, visibleTodosFromServerEdit] = useState([
    ...todosFromServer,
  ]);

  function SelectUser() {
    return (
      <>
        <option value="0" disabled>
          Choose a user
        </option>
        {usersFromServer.map((user) => {
          const { id, name } = user;

          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </>
    );
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    titleElementEdit(value);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    userElementEdit(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maxId = Math.max(...visibleTodosFromServer.map((todo) => todo.id));
    const newTodoBlock = {
      id: maxId + 1,
      title: titleElement,
      completed: false,
      userId: +userElement,
    };

    if (userElement === '0') {
      return false;
    }

    titleElementEdit('');
    userElementEdit('0');

    return visibleTodosFromServerEdit((prev) => [...prev, newTodoBlock]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Please enter a title"
            onChange={(event) => handleChangeTitle(event)}
            value={titleElement}
            required
          />
          {isErrorClick && titleElement === '' && (
            <span className="error title-error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            name="user"
            onChange={(event) => handleChangeUser(event)}
            value={userElement}
            required
          >
            <SelectUser />
          </select>

          {isErrorClick && userElement === '0' && (
            <span className="error user-error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="buttonSubmit"
          onClick={() => isErrorClickEdit(
            userElement === '0' || titleElement === '',
          )}
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={visibleTodosFromServer} />
      </section>
    </div>
  );
};
