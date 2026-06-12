import './App.scss';
import { Todo } from './components/types';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const users = [...usersFromServer];
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const isActive = title.trim() && user;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !title.trim()) {
      return;
    }

    let userId = 0;

    users.map(usr => {
      if (usr.id === user) {
        userId = usr.id;
      }
    });

    const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    const todo: Todo = {
      id: newId,
      title: title,
      completed: false,
      userId: userId,
    };

    setTodos([...todos, todo]);
    setTitle('');
    setUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          {title.trim().length === 0 ? (
            <span className="error"> Please enter a title</span>
          ) : (
            ''
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={user}
            onChange={e => {
              setUser(+e.target.value);
              // activeUser = e.target.value;
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(el => {
              return (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
          {!user ? <span className="error"> Please choose a user</span> : ''}
        </div>

        <button type="submit" data-cy="submitButton" disabled={!isActive}>
          Add
        </button>
      </form>
      <TodoList todos={todos} users={users} />
    </div>
  );
};
