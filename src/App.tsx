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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let largestId = 0;

    todos.forEach(t => {
      if (t.id > largestId) {
        largestId = t.id;
      }
    });

    const todo = {
      id: largestId + 1,
      title,
      userId: +user,
      completed: false,
    };

    if (title.trim() && user) {
      setTodos([...todos, todo]);
      setTitle('');
      setUser('');
      setTitleError(false);
      setUserError(false);
    } else {
      if (!title.trim()) {
        setTitleError(true);
      }

      if (!user) {
        setUserError(true);
      }
    }
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
              onChange={e => {
                setTitleError(false);
                setTitle(e.target.value);
              }}
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
              onChange={e => {
                setUserError(false);
                setUser(e.target.value);
              }}
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
