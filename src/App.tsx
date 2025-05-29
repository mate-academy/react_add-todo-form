import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './utilities/types/Todo';
import { handleSubmit } from './utilities/functions/handleSubmit';

const mappedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState(mappedTodos);
  const ids = todos.map(todo => todo.id);

  const [showErrorTitle, setShowErrorTitle] = useState(false);
  const [showErrorUser, setShowErrorUser] = useState(false);
  const [id, setId] = useState(Math.max(...ids) + 1);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={title}
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setShowErrorTitle(false);
            }}
          />
          {showErrorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            value={user || ''}
            name="user"
            onChange={event => {
              setUser(+event.target.value);
              setShowErrorUser(false);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(us => (
              <option key={us.id} value={us.id}>
                {us.name}
              </option>
            ))}
          </select>
          {showErrorUser && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={e => {
            e.preventDefault();
            handleSubmit({
              setId,
              setTodos,
              id,
              title,
              user,
              setShowErrorTitle,
              setShowErrorUser,
              setTitle,
              setUser,
            });
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
