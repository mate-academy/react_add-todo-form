import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App:React.FC = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  const [users] = useState(usersFromServer);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState({ title: false, user: false });

  const saveTodo = () => {
    setTodos((prev) => {
      return [...prev,
        {
          id: prev.length,
          title,
          completed: false,
          userId: users?.find(user => user.name === userName)?.id || -1,
        },
      ];
    });
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError({ ...error, title: true });
    }

    if (!userName.trim()) {
      setError({ title: false, user: true });
    }

    return title && userName;
  };

  const resetForm = () => {
    setTitle('');
    setUserName('');
    setError({ title: false, user: false });
  };

  const handleAdd = (e:React.MouseEvent) => {
    e.preventDefault();
    if (validateForm()) {
      saveTodo();
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value.replace(/[^A-Za-z0-9 ]/, ''));
            }}
          />
          {error.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setError({ ...error, user: false });
            }}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>
          {error.user && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={(e) => handleAdd(e)}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />

    </div>
  );
};
