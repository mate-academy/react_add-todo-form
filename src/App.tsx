import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setUserIdError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title !== '' && userId !== 0) {
      const id = todos.length + 1;

      todos.push({
        userId,
        id,
        title,
        completed: false,
      });

      setTitle('');
      setUserId(0);
    }

    if (title === '') {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserIdError(true);
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1 className="title is-1 ml-0">Add todo form</h1>

      <form
        className="box"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            value={title}
            className="input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {hasTitleError && (
            <span className="tag is-danger is-medium mt-1">
              Please enter a title
            </span>
          )}
        </div>
        <div>
          <select
            className="select is-fullwidth"
            value={userId}
            onChange={handleSelect}
          >
            <option
              value="0"
            >
              Choose a user
            </option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="tag is-danger is-medium mt-1">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          className="button"
        >
          Add
        </button>
      </form>
      <TodoList preparedTodos={todos} users={users} />
    </div>
  );
};

export default App;
