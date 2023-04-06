import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todos';
import { User } from './types/User';

import { TodoList } from './components/TodoList';

function findUserById(userId: number): User | null {
  const findUser = usersFromServer.find(user => user.id === userId);

  return findUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [todo, setTodo] = useState(todos);
  const [userIdCount, setUserIdCount] = useState(0);

  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    setErrorTitle(false);
  };

  const changeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserIdCount(+e.target.value);
    setErrorUser(false);
  };

  const hanldeSubmitNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleTrim = newTitle.trim();

    setErrorUser(!userIdCount);
    setErrorTitle(!titleTrim);

    const maxId = Math.max(...todo.map(tod => tod.id));

    if (titleTrim && userIdCount) {
      const newTodo = {
        id: maxId + 1,
        completed: false,
        title: titleTrim,
        userId: userIdCount,
        user: findUserById(userIdCount),
      };

      setTodo([...todo, newTodo]);
      setNewTitle('');
      setUserIdCount(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={hanldeSubmitNewTodo}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTitle}
              onChange={changeTitle}
            />
          </label>

          {errorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userIdCount}
              onChange={changeUser}
            >
              <option value="0">
                Choose a user
              </option>

              {usersFromServer.map(({ name, id }) => (
                <option
                  value={id}
                  key={id}
                >
                  {name}
                </option>
              ))}

            </select>
          </label>

          {errorUser && (
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
