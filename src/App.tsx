/* eslint-disable no-return-assign */
import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosArr = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosArr);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const checkInputString = (str: string): string => (
    str.replace(/[^a-zA-Z\u0400-\u04FF0-9 ]/g, '')
  );

  const updateTodos = () => {
    setTodos((prevTodos) => (
      [...prevTodos,
        {
          id: Math.max(...prevTodos.map(todo => todo.id)) + 1,
          title,
          userId,
          completed: false,
          user: getUser(userId),
        }]
    ));
  };

  const resetForm = () => {
    setUserId(0);
    setTitle('');
  };

  const handleSubmitData = () => {
    const emptyString = title.replace(/ /g, '');

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!emptyString) {
      setHasTitleError(true);
      setTitle('');

      return;
    }

    if (!title || !userId) {
      return;
    }

    updateTodos();
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmitData();
        }}
      >
        <div className="field">
          <label htmlFor="title_id">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={title}
            id="title_id"
            placeholder="Enter a title"
            onChange={(event) => {
              const inputTitle = checkInputString(event.target.value);

              setTitle(inputTitle);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user_id">
            User:
          </label>
          <select
            data-cy="userSelect"
            name="user"
            value={userId}
            id="user_id"
            onChange={(event) => {
              const { value } = event.target;

              setUserId(Number(value));
              setHasUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (

              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button
          type="submit"
          data-cy="submitButton"

        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
