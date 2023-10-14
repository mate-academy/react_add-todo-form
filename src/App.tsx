import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const initialTodo = {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  };

  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);
  const [newTodo, setNewTodo] = useState(initialTodo);

  const hasTitleError = wasSubmitted && newTodo.title === '';
  const hasUserError = wasSubmitted && newTodo.userId === 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasTitleError || hasUserError) {
      return;
    }

    setTodos([...todos, newTodo]);
    setNewTodo(initialTodo);
    setWasSubmitted(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      title: event.target.value,
      id: todos.length + 1,
    });
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTodo({
      ...newTodo,
      userId: Number(event.target.value),
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            className="input"
            placeholder="Enter a title"
            value={newTodo.title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            className="input"
            onChange={handleUserChange}
            value={newTodo.userId}
          >
            <option
              value={0}
              disabled
              selected
            >
              Choose a user
            </option>
            {usersFromServer.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button button--primary"
          onClick={() => setWasSubmitted(true)}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
