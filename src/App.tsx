import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const allTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [todos, setTodos] = useState(allTodos);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleClear = () => {
    setTitle('');
    setUser(0);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = Math.max(...todos.map((item) => item.id)) + 1;

    if (!user) {
      setUserError(true);
    }

    if (!title) {
      setTitleError(true);
    }

    if (!user || !title) {
      return;
    }

    const newTodos = {
      title,
      user: getUser(user),
      completed: false,
      id: newId,
      userId: user,
    };

    setTodos([...todos, newTodos]);
    handleClear();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          Title:
          {' '}
          <input
            onFocus={() => setTitleError(false)}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {titleError && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          User:
          {' '}
          <select
            onFocus={() => setUserError(false)}
            data-cy="userSelect"
            value={user}
            onChange={event => setUser(+event.target.value)}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(users => (
              <option
                key={users.id}
                value={users.id}
              >
                {users.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}

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
