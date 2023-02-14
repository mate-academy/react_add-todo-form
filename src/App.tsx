/* eslint-disable max-len */
import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { getUser } from './components/TodoInfo';
import { Todo } from './types/Todo';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const visibleTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState(visibleTodos);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const newId = Math.max(...todos.map(todo => todo.id));

  const resetForm = () => {
    setUser(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!user);

    const newTodo:Todo = {
      id: newId + 1,
      title,
      userId: user,
      completed: false,
      user: getUser(user),
    };

    if (user && title) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
      resetForm();
    }
  };

  const inputTitle = (value: string) => {
    if (value !== ' ') {
      setTitleError(false);
      setTitle(value);
    } else {
      setTitleError(true);
    }
  };

  const selectUser = (value: number) => {
    setUser(value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                inputTitle(event.target.value);
              }}
            />
            { titleError && (
              <span
                className="error"
              >
                Please enter a title
              </span>
            )}
          </label>

        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              name="user"
              value={user}
              onChange={(event) => {
                selectUser(+event.target.value);
              }}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>
              {usersFromServer.map(userFromServer => {
                const {
                  id,
                  name,
                } = userFromServer;

                return (
                  <option
                    value={id}
                    key={id}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
            { userError && (
              <span
                className="error"
              >
                Please choose a user
              </span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
