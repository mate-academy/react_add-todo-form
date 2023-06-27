import React, { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [requiredTodoTitle, setRequiredTodoTitle] = useState(false);
  const [requiredUserId, setRequiredUserId] = useState(false);

  const addTodo = () => {
    const newTodo = {
      id: todos.reduce((max, todo) => (max < todo.id ? todo.id : max), 0) + 1,
      title: todoTitle,
      completed: false,
      userId: +userId,
    };

    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoTitle === '') {
      setRequiredTodoTitle(true);
    }

    if (userId === '') {
      setRequiredUserId(true);
    }

    if (userId === '' || todoTitle === '') {
      return;
    }

    addTodo();
    setTodoTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter text"
            value={todoTitle}
            onChange={(event) => {
              setTodoTitle(event.currentTarget.value);
              setRequiredTodoTitle(false);
            }}
          />
          <span className="error">
            {requiredTodoTitle && 'Please enter a title'}
          </span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(event.currentTarget.value);
              setRequiredUserId(false);
            }}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">
            {requiredUserId && 'Please choose a user'}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
