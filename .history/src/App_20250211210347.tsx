import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
// import todosFromServer from './api/todos';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { set } from 'cypress/types/lodash';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('0');
  const [title, setTitle] = useState('');
  const [todosFromServer, setTodosFromServer] = useState(todos);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    type Todo = {
      id: number;
      title: string;
      completed: boolean;
      userId: number;
    };

    const user = usersFromServer.find(item => item.username === selectedUser);

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: todosFromServer.length + 1,
      title: title,
      completed: false,
      userId: user.id,
    };

    setTodosFromServer([...todosFromServer, newTodo]);
    setTitle('');
    setSelectedUser('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            data-cy="titleInput"
            value={title}
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.username}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosFromServer} />
    </div>
  );
};
