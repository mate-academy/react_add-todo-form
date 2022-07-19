import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import User from './components/types/User';
import Todo from './components/types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isValidTitle, setTitleError] = useState(false);
  const [isValidUser, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">

      <form
        action="/api/users"
        method="POST"
        className="form box"
        onSubmit={handleSubmit}
      >
        <div className="field ">
          <label>
            {'Title: '}
            <input
              placeholder="Title"
              type="text"
              data-cy="titleInput"
              value={title}
              className="form_field input is-info"
              onChange={event => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
          </label>

          {isValidTitle && (
            <p className="error">Please fill the title</p>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              className="form_field select is-info"
              onChange={event => {
                setUserId(+event.target.value);
                setUserError(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isValidUser && (
            <p className="error">Please choose a user</p>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-info button__main"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
