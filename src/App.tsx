/* eslint-disable @typescript-eslint/indent */
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const createId = () => {
    return Math.max(...todos.map(a => a.id)) + 1;
  };

  const [newTodo, setNewTodo] = useState({
    id: createId(),
    title: '',
    completed: false,
    userId: 0,
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setNewTodo(prev => ({ ...prev, [name]: value }));
  };

  const hasError = !newTodo.title.trim() || newTodo.userId === 0;
  const [canShowError, setCanShowError] = useState({
    title: false,
    userId: false,
  });

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (!hasError) {
      setTodos(prev => [...prev, newTodo]);
      setCanShowError({
        title: false,
        userId: false,
      });
      setNewTodo({ id: createId(), title: '', completed: false, userId: 0 });
    } else {
      setCanShowError({
        title: true,
        userId: true,
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title"> Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            data-cy="titleInput"
            value={newTodo.title}
            onChange={handleChange}
          />
          {!newTodo.title.trim() && canShowError.title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userId">User: </label>
          <select
            id="userId"
            name="userId"
            data-cy="userSelect"
            value={newTodo.userId}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {canShowError.userId && newTodo.userId === 0 && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleSubmit}>
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
