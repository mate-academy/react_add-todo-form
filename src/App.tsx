import React, { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

import './App.scss';

const preparedTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState([...preparedTodos]);
  const [titleValue, setTitleValue] = useState('');
  const [chosenUser, setChosenUser] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = usersFromServer
      .find(curUser => curUser.name === chosenUser) || null;

    const newTodo = {
      userId: user ? user.id : 0,
      id: todos.length + 1,
      title: titleValue,
      completed: false,
      user: user || null,
    };

    setTitleError(!titleValue);
    setUserError(!chosenUser);

    if (!titleValue || !chosenUser) {
      return;
    }

    setTodos(curTodos => [newTodo, ...curTodos]);
    setTitleValue('');
    setChosenUser('');
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form
        className="field"
        action="/api/users"
        method="POST"
        onSubmit={(event) => onSubmit(event)}
      >
        <div className="field__wrapper">
          <input
            className="field__title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleValue}
            onChange={(event) => {
              setTitleError(false);

              setTitleValue(event.target.value);
            }}

          />
          {hasTitleError && (
            <span className="error"> Please enter a title</span>
          )}
        </div>

        <div className="field__wrapper">
          <select
            className="field__select"
            data-cy="userSelect"
            value={chosenUser}
            onChange={(event) => {
              setUserError(false);

              setChosenUser(event.target.value);
            }}
          >
            <option
              value={chosenUser}
              disabled
            >
              Chose a user
            </option>

            {usersFromServer.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="error"> Please choose a user</span>
          )}
        </div>

        <button
          className="field__button"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todoList={todos} />
    </div>
  );
};
