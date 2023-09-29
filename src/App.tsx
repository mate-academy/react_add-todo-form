import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const createTodos = () => todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [formSubmit, setFormSubmit] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(createTodos());

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmit(true);

    if (title.trim() === '' || +userId === 0) {
      return;
    }

    const largeId = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0);

    const newTodo: Todo = {
      id: largeId + 1,
      title,
      userId: +userId,
      completed: false,
      user: getUser(+userId),
    };

    setTodos((prevtodos) => [...prevtodos, newTodo]);

    setTitle('');
    setUserId('0');
    setFormSubmit(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            name="title"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {formSubmit && !title.trim()
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            name="user"
            id="user"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
          {formSubmit && userId === '0'
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
