import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [choosedUser, setChoosedUser] = useState(0);
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidChoosedUser, setIsValidChoosedUser] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(todosFromServer);

  const getMaxId = () => {
    return Math.max(...visibleTodos.map(todos => todos.id));
  };

  const handleReset = () => {
    setTitle('');
    setChoosedUser(0);
    setIsValidTitle(false);
    setIsValidChoosedUser(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsValidTitle(true);
      setTitle('');
    }

    if (!choosedUser) {
      setIsValidChoosedUser(true);
    }

    if (title.trim() && choosedUser) {
      setVisibleTodos(currentTodos => [...currentTodos, {
        id: getMaxId() + 1,
        title,
        completed: false,
        userId: choosedUser,
      }]);
      handleReset();
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
          <label>
            {'Title: '}
            <input
              onChange={event => {
                setTitle(event.target.value);
                setIsValidTitle(false);
              }}
              value={title}
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
            />
          </label>
          {isValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              onChange={event => {
                setChoosedUser(+event.target.value);
                setIsValidChoosedUser(false);
              }}
              data-cy="userSelect"
              defaultValue={0}
              value={choosedUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isValidChoosedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        visibleTodos={visibleTodos}
        usersFromServer={usersFromServer}
      />
    </div>
  );
};
