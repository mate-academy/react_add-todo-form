import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App:React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const isValid = (title: string) => {
    const regExp = /^[ а-яА-Я\w]*$/;

    if (regExp.test(title)) {
      setTitleInput(title);
    }
  };

  const addTodo = (id: number) => {
    if (titleInput.trim().length === 0) {
      setTitleError(true);
    }

    if (selectUser === 0) {
      setUserError(true);
    }

    if (selectUser === 0 || titleInput.trim().length === 0) {
      return;
    }

    const currentUser = usersFromServer.find(user => user.id === id);
    const maxId = todos.reduce((acc, el) => Math.max(acc, el.id), 0) + 1;

    if (currentUser) {
      todos.push({
        id: maxId,
        userId: id,
        title: titleInput,
        completed: false,
        user: currentUser,
      });

      setTitleInput('');
      setSelectUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          addTodo(selectUser);
          event.preventDefault();
        }}
      >
        <label>
          <div className="field">
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={titleInput}
              onChange={(event) => {
                isValid(event.target.value);
                setTitleError(false);
              }}
            />
            {titleError && (
              <span className="error">Please enter a title</span>
            )}
          </div>
        </label>

        <label>
          <div className="field">
            {' User: '}
            <select
              data-cy="userSelect"
              value={selectUser}
              onChange={(event) => {
                setSelectUser(+event.target.value);
                setUserError(false);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {userError && (
              <span className="error">
                Please choose a user
              </span>
            )}
          </div>
        </label>

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
