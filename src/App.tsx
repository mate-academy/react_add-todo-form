import React, { FormEventHandler, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setuserId] = useState('');
  const [updatedTodos, setUpdatedTodos] = useState(todos);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (title && userId) {
      const newTodo = {
        id: Math.max(...updatedTodos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: +userId,
        user: getUser(+userId),
      };

      setUpdatedTodos([...updatedTodos, newTodo]);
      setFormSubmitted(false);
      setTitle('');
      setuserId('');
    } else {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" onSubmit={handleSubmit} method="POST">

        <div className="field">
          <label htmlFor="title">
            Title:
            {' '}
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              data-cy="titleInput"
            />
          </label>

          {(!title && formSubmitted) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="title">
            User:
            {' '}
            <select
              data-cy="userSelect"
              id="user"
              name="user"
              value={userId}
              onChange={(event) => setuserId(event.target.value)}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {(!userId && formSubmitted) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={updatedTodos} />
    </div>
  );
};
