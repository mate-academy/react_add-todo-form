/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { TODO } from './types/TODO';
import { TodoList } from './components/TodoList/TodoList';

function getUserById(todoId: number): User | null {
  return usersFromServer.find(users => users.id === todoId) || null;
}

const todoPlusUser = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.id),
}));

export const App = () => {
  const [todos, setTodos] = useState(todoPlusUser);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorSelect, setErrorSelect] = useState(false);

  const clearForm = () => {
    if (errorTitle) {
      setTitle('');
    }

    if (errorSelect) {
      setUserId(0);
    }
  };

  function addToDo() {
    if (!title.trim()) {
      setErrorTitle(true);
    }

    if (!userId) {
      setErrorSelect(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    setTodos((prevTodos: TODO[]) => {
      const newTodo: TODO = {
        id: Math.max(...todoPlusUser.map(todo => todo.id)) + 1,
        title,
        userId,
        completed: false,
        user: getUserById(userId),
      };

      return [...prevTodos, newTodo];
    });
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          addToDo();
          clearForm();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value
                .replace(/[!@#$%'`";:|^&*,.\\<>?/()_+={\][}-]/g, ''));

              if (errorTitle) {
                setErrorTitle(false);
              }
            }}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(e) => {
              setUserId(Number(e.target.value));
              if (errorSelect) {
                setErrorSelect(false);
              }
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>

            ))}
          </select>

          {errorSelect && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
