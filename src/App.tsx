import './App.scss';
import { useState } from 'react';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [prepareTodo, setPrepareTodo] = useState(todos);
  const [isAdded, setAdded] = useState(false);

  const isVisibleTitle = title.length === 0
    && isAdded;

  const isVisibleSelect = name.length === 0
    && isAdded;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();

          const person = usersFromServer.find(user => user.name === name);

          setAdded(true);

          if (!person || !title || !name) {
            return;
          }

          setPrepareTodo([...prepareTodo, {
            id: Math.max(...prepareTodo.map(todo => todo.id)) + 1,
            userId: person.id,
            title,
            completed: false,
            user: person,
          }]);

          setAdded(false);
          setName('');
          setTitle('');
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={(event) => (
              setTitle(event.target.value)
            )}
          />

          {isVisibleTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={name}
            onChange={event => (
              setName(event.target.value)
            )}
          >
            <option
              value=""
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isVisibleSelect && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={prepareTodo} />
    </div>
  );
};
