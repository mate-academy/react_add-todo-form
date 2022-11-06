import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/user';
import { Todo } from './types/todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todosForRender, setTodos] = useState(todos);

  const [title, setTitle] = useState('');
  const [UserID, addUserId] = useState(0);
  const [titleErr, setTitleError] = useState(false);
  const [userErr, setUserIdError] = useState(false);

  const refreshForm = () => {
    setTitle('');
    addUserId(0);
  };

  const inputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  function generateId() {
    const max = todosForRender.reduce((largest, x) => {
      return largest > x ? largest : x;
    });

    return max.id + 1;
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (title === '' || UserID === 0) {
      if (title === '') {
        setTitleError(true);
      }

      if (UserID === 0) {
        setUserIdError(true);
      }

      return;
    }

    const newTodo: Todo = {
      id: generateId(),
      userId: UserID,
      title,
      completed: false,
      user: getUser(UserID),
    };

    setTodos(currTodos => [...currTodos, newTodo]);
    refreshForm();
  };

  const handleUsers = (event: React.ChangeEvent<HTMLSelectElement>) => {
    addUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={inputValue}
            />
          </label>
          {titleErr && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={UserID}
              onChange={handleUsers}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userErr && (
            <span className="error">
              Please choose a user
            </span>
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
        <TodoList todos={todosForRender} />
      </section>
    </div>
  );
};
