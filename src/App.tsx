import './App.scss';
import { FormEvent, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [error, setError] = useState({ titleError: false, userError: false });

  const addTodo = () => {
    const newTodo = {
      id: Math.max(0, ...todos.map(({ id }) => id)) + 1,
      title,
      completed: false,
      userId: +userId,
      user: getUser(userId),
    };

    todos.push(newTodo);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setError({ titleError: false, userError: false });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!userId || !title) {
      if (!title) {
        setError(state => (
          {
            ...state,
            titleError: true,
          }
        ));
      }

      if (!userId) {
        setError(state => (
          {
            ...state,
            userError: true,
          }
        ));
      }

      return;
    }

    addTodo();
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              name="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={(event) => {
                setTitle(event.target.value);
                setError({ ...error, titleError: false });
              }}
            />
          </label>

          {error.titleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              name="user"
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(+event.target.value);
                setError({ ...error, userError: false });
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {error.userError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
