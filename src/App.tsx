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
  const [userID, addUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const refreshForm = () => {
    setTitle('');
    addUserId(0);
  };

  const inputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  function generateId() {
    return Math.max(...todosForRender.map(o => o.id)) + 1;
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(title === '');
    setIsUserError(userID === 0);

    const newTodo: Todo = {
      id: generateId(),
      userId: userID,
      title,
      completed: false,
      user: getUser(userID),
    };

    if (title !== '' && userID !== 0) {
      setTodos(currTodos => [...currTodos, newTodo]);
      refreshForm();
    }
  };

  const handleUsers = (event: React.ChangeEvent<HTMLSelectElement>) => {
    addUserId(+event.target.value);
    setIsUserError(false);
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
          {isTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userID}
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

          {isUserError && (
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
