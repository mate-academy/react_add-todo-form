import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  function getUserOnId(id: number) {
    return usersFromServer.find(user => user.id === id);
  }

  const [title, setTitle] = useState('');
  const [userSelect, setUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userSelectError, setUserSelectError] = useState(false);

  const todoAndUser = [...todosFromServer].map(todo => (
    {
      ...todo,
      user: getUserOnId(todo.userId),
    }
  ));

  const [renderTodos, setRenderTodos] = useState(todoAndUser);

  const examinationAddTodos = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // eslint-disable-next-line max-len, @typescript-eslint/no-unused-expressions
    title.trim() === '' ? setTitleError(true) : setTitleError(false);
    // eslint-disable-next-line max-len, @typescript-eslint/no-unused-expressions
    userSelect === 0 ? setUserSelectError(true) : setUserSelectError(false);

    if (title.trim() !== '' && userSelect !== 0) {
      const newUser = {
        id: renderTodos.length,
        title,
        completed: false,
        userId: userSelect,
        user: getUserOnId(userSelect),
      };

      setRenderTodos(state => [...state, newUser]);

      setTitle('');
      setUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label>
            {'Title: '}
            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError(false);
              }}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userSelect}
              onChange={(e) => {
                setUser(+e.target.value);
                setUserSelectError(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userSelectError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={(e) => examinationAddTodos(e)}
        >
          Add
        </button>
      </form>

      <TodoList renderTodos={renderTodos} />
    </div>
  );
};
