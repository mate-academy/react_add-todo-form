import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  function getUserById(id: number) {
    return usersFromServer.find(user => user.id === id);
  }

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userSelectError, setUserSelectError] = useState(false);

  const todoAndUser = [...todosFromServer].map(todo => (
    {
      ...todo,
      user: getUserById(todo.userId),
    }
  ));

  const [renderTodos, setRenderTodos] = useState(todoAndUser);

  const handleTodoAdd = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // eslint-disable-next-line max-len, @typescript-eslint/no-unused-expressions
    setTitleError(!title.trim());
    // eslint-disable-next-line max-len, @typescript-eslint/no-unused-expressions
    setUserSelectError(!selectedUserId);

    if (title.trim() && selectedUserId) {
      const newUser = {
        id: renderTodos.length,
        title,
        completed: false,
        userId: selectedUserId,
        user: getUserById(selectedUserId),
      };

      setRenderTodos(state => [...state, newUser]);

      setTitle('');
      setSelectedUserId(0);
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
          {titleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={(e) => {
                setSelectedUserId(+e.target.value);
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
          onClick={handleTodoAdd}
        >
          Add
        </button>
      </form>

      <TodoList todos={renderTodos} />
    </div>
  );
};
