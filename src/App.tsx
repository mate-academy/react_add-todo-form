import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [visibleTodos, setTodos] = useState(todos);
  const [username, setUsername] = useState('0');
  const [isNoTitle, setIsNoTitle] = useState(false);
  const [isNoUser, setIsNoUser] = useState(false);

  const largestId = Math.max(...todos.map(todo => todo.id));

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        if (value.length !== 0) {
          setIsNoTitle(false);
        }

        return setTitle(value);

      case 'username':
        if (value) {
          setIsNoUser(false);
        }

        return setUsername(value);

      default:
        return 0;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const selectedUser = usersFromServer.find(user => (
      user.name === username));

    if (selectedUser && title.length !== 0) {
      setTodos([
        ...visibleTodos,
        {
          id: largestId + 1,
          title: `${title}`,
          completed: false,
          userId: selectedUser.id,
          user: selectedUser,
        },
      ]);
      setTitle('');
      setUsername('0');
    }

    if (title.length === 0) {
      setIsNoTitle(true);
    }

    if (!selectedUser) {
      setIsNoUser(true);
    }
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
            id="title"
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={handleChange}
          />

          {isNoTitle && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            {'User: '}
          </label>

          <select
            id="user"
            data-cy="userSelect"
            name="username"
            required
            value={username}
            onChange={handleChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(currUser => {
              return (
                <option
                  key={currUser.id}
                  value={currUser.name}
                >
                  {currUser.name}
                </option>
              );
            })}
          </select>

          {isNoUser && (
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

      <TodoList todos={visibleTodos} />
    </div>
  );
};
