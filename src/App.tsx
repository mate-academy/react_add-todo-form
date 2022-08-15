import { useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todos';
import { User } from './types/Users';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userid: number | null): User | null {
  const foundUser = usersFromServer.find(user => user.id === userid);

  return foundUser || null;
}

const getUserId = (username: string): number | null => {
  const foundId = usersFromServer.find(user => user.name === username);

  return foundId?.id || null;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [toDo, setToDo] = useState(todos);
  const [eror, setEror] = useState(false);

  const newId = [
    ...toDo.sort((a, b) => a.id - b.id)][todosFromServer.length - 1].id + 1;
  const newUserId = getUserId(user);
  const newUser = getUser(newUserId);
  const createTodo = () => (
    {
      id: newId,
      title,
      completed: false,
      userId: newUserId,
      user: newUser,
    }
  );

  const newEl = createTodo();
  const add = () => {
    toDo.push(newEl);

    return todos;
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        id="form"
        action="/api/users"
        method="Post"
        onSubmit={(event) => {
          event.preventDefault();

          if (user.trim() !== '') {
            setTitle('');
          }

          if (title.trim() !== '') {
            setUser('');
          }

          if (user.trim() !== '' && title.trim() !== '') {
            setToDo(add());
            setEror(false);
          }
        }}
      >
        <div className="field">
          <input
            id="text"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="enter todo title"
            required
          />
          {eror && (
            <span
            // eslint-disable-next-line quote-props
              className={classNames('no-error', { 'error': title === '' })}
            >
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={(event => setUser(event.target.value))}
            required
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(el => (
              <option
                value={el.name}
                key={el.id}
              >
                {el.name}
              </option>
            ))}
          </select>

          {eror && (
            <span
              className={classNames(
                // eslint-disable-next-line quote-props
                'no-error', { 'error': user === '0' || user === '' },
              )}
            >
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            if (user === '' || title === '') {
              setEror(true);
            }
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={toDo} />

    </div>
  );
};
