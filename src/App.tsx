import './App.scss';

import { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
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
  const [oldTodos, setTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [completed] = useState(false);
  const [TitleErrorMessage, setErrorTitle] = useState(false);
  const [UserIdErrorMessage, setErrorUserId] = useState(false);

  const createTodo = () => {
    return (
      {
        id: Math.max(0, ...oldTodos.map(({ id }) => id + 1)),
        userId,
        title,
        completed,
        user: getUser(userId),
      }
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title.length === 0) {
      setErrorTitle(true);
    }

    if (userId === 0) {
      setErrorUserId(true);
    }

    if (userId === 0 || title.length === 0) {
      return;
    }

    setTitle('');
    setUserId(0);
    setTodos([...oldTodos, createTodo()]);
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
          <label htmlFor="title">
            {'Title: '}
          </label>

          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorTitle(false);
            }}
          />
          {
            TitleErrorMessage
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label htmlFor="users">
            {'User: '}
          </label>

          <select
            data-cy="userSelect"
            id="users"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setErrorUserId(false);
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {UserIdErrorMessage
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={oldTodos} />
      </section>
    </div>
  );
};
