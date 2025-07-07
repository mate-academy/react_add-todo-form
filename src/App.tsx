import './App.scss';

import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const initialData = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todosData, setTodosData] = useState(initialData);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userSelect, setUserSelect] = useState(0);
  const [hasUserSelectError, setHasUserSelectError] = useState(false);

  const handleTitleError = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTitleError(false);
    setTitle(event.target.value);
  };

  // eslint-disable-next-line max-len
  const handleUserSelectError = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setHasUserSelectError(false);
    setUserSelect(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const hasTitle = title.trim();

    if (!hasTitle) {
      setHasTitleError(true);
    }

    if (!userSelect) {
      setHasUserSelectError(true);
    }

    if (!hasTitle || !userSelect) {
      return;
    }

    const newTodo = {
      id: Math.max(...(todosData.map(t => t.id) || 0)) + 1,
      title: title.trim(),
      completed: false,
      userId: +userSelect,
      user: usersFromServer.find(user => user.id === userSelect),
    };

    setTodosData(todo => [...todo, newTodo]);

    setTitle('');
    setUserSelect(0);
    setHasTitleError(false);
    setHasUserSelectError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleError}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userSelect}
            onChange={handleUserSelectError}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosData} />
    </div>
  );
};
