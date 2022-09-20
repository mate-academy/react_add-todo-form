import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User, Todo } from './react-app-env';
// eslint-disable-next-line import/no-cycle
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUserSelect, setErrorUserSelect] = useState(false);

  const todos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  })).filter(todo => todo.title !== '' && todo.userId !== 0);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          todosFromServer.push({
            id: todosFromServer.length,
            title,
            completed: false,
            userId: +selectedUser,
          });

          setErrorTitle(title === '' && true);
          setErrorUserSelect(selectedUser === 0 && true);
          setTitle('');
          setSelectedUser(0);
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
                setTitle(event.target.value);
                setErrorTitle(false);
              }}
            />
            {errorTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={(event) => {
                setSelectedUser(+event.target.value);
                setErrorUserSelect(false);
              }}
            >
              <option
                value="0"
                disabled
                selected
              >
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {errorUserSelect && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList props={todos} />
    </div>
  );
};
