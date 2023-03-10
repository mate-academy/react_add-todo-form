import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  const [title, setTitle] = useState('');
  const [hasTitle, setHasTitle] = useState(true);
  const [user, setUser] = useState(0);
  const [hasUser, setHasUser] = useState(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === ' ' && !title) {
      setTitle('');
    } else {
      setTitle(value);
      setHasTitle(true);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setHasUser(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      setHasUser(false);
    }

    if (!title) {
      setHasTitle(false);
    }

    if (user && title) {
      const id = Math.max.apply(null, todos.map(todo => todo.id)) + 1;
      const newTodo = new Todo(id, title, user);

      setTodos([...todos, newTodo]);
      setTitle('');
      setUser(0);
    }
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
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
          />

          {!hasTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            name="user"
            value={user}
            onChange={handleUserChange}
            data-cy="userSelect"
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>

          {!hasUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
        users={usersFromServer}
      />
    </div>
  );
};
