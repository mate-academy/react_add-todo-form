import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

export const App = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [users] = useState([...usersFromServer]);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const reset = () => {
    setTitle('');
    setUser('');
    setTitleError(false);
    setUserError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() && user) {
      const todo = {
        id: Math.max(...todos.map((t) => t.id)) + 1,
        title,
        userId: +user,
        completed: false,
      };

      setTodos([...todos, todo]);
      reset();
    } else {
      if (!title.trim()) {
        setTitleError(true);
      }

      if (!user) {
        setUserError(true);
      }
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(e.target.value);
  };

  const handleUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setUser(e.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="">
            Title:
            {' '}
            <input
              type="text"
              data-cy="titleInput"
              id="title"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              data-cy="userSelect"
              id="user"
              name="user"
              value={user}
              onChange={handleUser}
            >
              <option value="" disabled>Choose a user</option>
              {users.map(u => {
                return <option value={u.id} key={u.id}>{u.name}</option>;
              })}
            </select>

          </label>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
