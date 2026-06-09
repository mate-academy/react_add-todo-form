import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const App = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  // const [users, setUsers] = useState([...usersFromServer]);
  const users = [...usersFromServer];
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  let userId = 0;
  let email = '';
  const isActive = title.trim() && user;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !title.trim()) {
      return;
    }

    users.map(usr => {
      if (usr.name === user) {
        userId = usr.id;
        email = usr.email;
      }
    });

    const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    const todo: Todo = {
      id: newId,
      title: title,
      completed: false,
      userId: userId,
    };
    const whatToDo = [...todos];

    whatToDo.push({ ...todo });
    setTodos(whatToDo);
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
            onChange={e => setUser(e.target.value)}
            defaultValue={0}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {[...users].map(el => {
              return (
                <option key={el.id} value={el.name}>
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
      <TodoList user={String(user)} email={email} todos={todos} />
    </div>
  );
};
