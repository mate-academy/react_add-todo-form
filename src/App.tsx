import './App.scss';
import { TodoList } from './components/TodoList';
import { Todos } from './types/Todo';
import todosFromServer from './api/todos';

import usersFromServer from './api/users';
import { useState } from 'react';

function getMaxId(users: Todos[]) {
  const id = Math.max(
    ...users.map(user => user.id),
  );

  return id + 1;
}

function getUser(userId: number) {
  const findUser = usersFromServer.find(user => user.id === userId);

  return findUser;
}

export const App: React.FC = () => {

  const [user, setUser] = useState(0);
  const initialTodo: Todos[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUser(user),
  }));
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(initialTodo);
  const [titleHasError, setTitleHasError] = useState(false);
  const [userHasError, setUserHasError] = useState(false);

  const onAdd = (value: Todos) => {
    setTodos(prevValue => [...prevValue, value]);
  };

  const reset = () => {
    setTitle('');
    setUser(0);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setUserHasError(!user);
    setTitleHasError(!title);

    if (!user || !title) {
      return;
    }

    onAdd({
      title,
      id: getMaxId(todos),
      completed: false,
      userId: user,
      user: getUser(user),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <label htmlFor="">
            Title:

            <input
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={title}
              onChange={event => {
                setTitle(event.target.value);
                setTitleHasError(false);
              }}
            />
            {titleHasError && (
              <span className="error">Please enter a title</span>
            )}
          </label>

        </div>

        <div className="field">
          <label htmlFor="">
            User:

            <select
              data-cy="userSelect"
              defaultValue="Choose a user"
              value={user}
              onChange={event => {
                setUser(+event.target.value);
                setUserHasError(false);
              }}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>
              {
                usersFromServer.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))
              }
              
            </select>
            { userHasError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
