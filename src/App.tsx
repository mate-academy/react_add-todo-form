import './App.scss';
import React, { useState } from 'react';

import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/todo';
import { User } from './types/user';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(todoID: number): User | null {
  return usersFromServer.find(user => user.id === todoID) || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const createTodo = (title: string, user: User, isCompleted: boolean): Todo => {
  return {
    id: Math.max(...todosWithUser.map(i => i.id)) + 1,
    title,
    completed: isCompleted,
    userId: user.id,
    user,
  };
};

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState(false);
  const [errorMessageUser, setErrorMessageUser] = useState(false);

  function AddTodo() {
    if (currentUser) {
      todosWithUser.push(createTodo(currentTitle, currentUser, isCompleted));
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentTitle.length <= 0) {
      setErrorMessageTitle(true);
    }

    if (!currentUser) {
      setErrorMessageUser(true);
    }

    if (!currentUser || currentTitle.length <= 0) {
      return;
    }

    AddTodo();

    setErrorMessageTitle(false);
    setErrorMessageUser(false);
    setIsCompleted(false);
    setCurrentTitle('');
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label className="field__label">
            Title
            <input
              className="field__input"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={currentTitle}
              onChange={event => {
                if (event.target.value[0] !== ' ') {
                  setCurrentTitle(event.target.value);
                  setErrorMessageTitle(false);
                }
              }}
            />
            {errorMessageTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label className="field__label">
            User
            <select
              data-cy="userSelect"
              className="field__select"
              value={currentUser ? currentUser.id : 0}
              onChange={event => {
                const foundUser = usersFromServer
                  .find(user => user.id === +event.target.value);

                if (foundUser) {
                  setCurrentUser(foundUser);
                }

                setErrorMessageUser(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
            {errorMessageUser && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <div className="field">
          <label className="field__label">
            Completed
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => setIsCompleted(currentState => !currentState)}
            />
          </label>
        </div>

        <button
          className="button"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todosWithUser} />
    </div>
  );
};
