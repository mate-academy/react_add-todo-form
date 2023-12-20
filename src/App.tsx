import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getUserByName(name: string): User | null {
  const foundUser = usersFromServer.find(user => user.name === name);

  return foundUser ?? null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todo, setTodo] = useState(todos);
  const [title, setTitle] = useState('');
  const [userValue, setUserValue] = useState('');
  const [titleEmpty, setTitleEmpty] = useState(false);
  const [userEmpty, setUserEmpty] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleEmpty(true);
    } else {
      setTitleEmpty(false);
    }

    if (!userValue) {
      setUserEmpty(true);
    } else {
      setUserEmpty(false);
    }

    const maxId = Math.max(...todo.map((t) => t.id), 0);

    if (title && userValue) {
      setTodo([...todo,
        {
          id: maxId + 1,
          title,
          completed: false,
          userId: 1,
          user: getUserByName(userValue),
        },
      ]);

      setTitle('');
      setUserValue('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(element) => {
              setTitle(element.target.value);
              setTitleEmpty(false);
            }}
          />

          {titleEmpty && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            defaultValue=""
            value={userValue}
            onChange={(element) => {
              setUserValue(element.target.value);
              setUserEmpty(false);
            }}
          >
            <option
              disabled
              value=""
            >
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option value={user.name}>{user.name}</option>
            ))}
          </select>

          {userEmpty && (
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

      <TodoList todos={todo} />
    </div>
  );
};
