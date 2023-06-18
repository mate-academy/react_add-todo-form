import './App.scss';
import { FormEvent, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { validation } from './utils/validation';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (selectedUserId === '0') {
      setUserError(true);
    }

    if (!title || title.trim().length === 0) {
      return setTitleError(true);
    }

    const copyTitle = title.slice().split('');

    if (copyTitle.length !== copyTitle
      .filter((letter: string) => validation.includes(letter)).length) {
      return null;
    }

    const user = usersFromServer
      .find(userFromServer => userFromServer.id === +selectedUserId);

    if (user !== undefined) {
      todos.push({
        id: todos
          .sort((todo1, todo2) => todo2.id - todo1.id)[0].id + 1,
        title,
        completed: false,
        userId: user.id,
        user,
      });

      setSelectedUserId('0');
      setTitle('');
    }

    return todosFromServer;
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
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={(e) => {
                setTitle(e.currentTarget.value);
                setTitleError(false);
              }}
            />
          </label>

          {titleError && (
            <span
              className="error"
            >
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          {'User: '}
          <select
            value={selectedUserId}
            data-cy="userSelect"
            onChange={(e) => {
              setSelectedUserId(e.target.value);
              setUserError(false);
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(userFromServer => (
              <option
                value={userFromServer.id}
              >
                {userFromServer.name}
              </option>
            ))}
          </select>

          {userError && (
            <span
              className="error"
            >
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
