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
    setError((prev) => ({ ...prev, title: !title.trim() }));
    setError((prev) => ({ ...prev, user: !userName.trim() }));
  };

  const resetForm = () => {
    setTitle('');
    setUserName('');
    setError({ title: false, user: false });
  };

  const handleAdd = (e:React.MouseEvent) => {
    e.preventDefault();
    validateForm();
    if (title && userName) {
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
              if (e.target.value.match(/^[a-zA-Z0-9\sа-яА-Я]*$/)) {
                setTitle(e.target.value);
                setError((prev) => ({ ...prev, title: false }));
              }
            }}
            onBlur={() => validateForm()}
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
              setError((prev) => ({ ...prev, user: false }));
            }}
            onBlur={() => validateForm()}
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
          onClick={handleAdd}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />

    </div>
  );
};
