import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const newTodoId = Math.max(...todosFromServer.map(todo => todo.id)) + 1;

const defoultTodo = {
  id: newTodoId,
  title: '',
  completed: false,
  userId: 0,
};

const isHasError = {
  title: false,
  userId: false,
};

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [newTodo, setNewTodo] = useState(defoultTodo);
  const [initialError, setInitialError] = useState(isHasError);

  const handleInputChange = (key: string, value: string | number) => {
    setNewTodo(prev => ({ ...prev, [key]: value }));
    setInitialError(prev => ({ ...prev, [key]: false }));
  };

  const reset = () => setNewTodo(defoultTodo);

  const addTodo = (todo: Todo) => setTodos([...todos, todo]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodo.title.trim()) {
      setInitialError(prevValue => ({ ...prevValue, title: true }));
    }

    if (!newTodo.userId) {
      setInitialError(prevValue => ({ ...prevValue, userId: true }));
    }

    if (!newTodo.title.trim() || !newTodo.userId) {
      return;
    }

    addTodo(newTodo);
    setInitialError(prevValue => ({ ...prevValue, title: false }));
    setInitialError(prevValue => ({ ...prevValue, userId: false }));

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              value={newTodo.title}
              placeholder="Enter a title"
              onChange={event => handleInputChange(
                'title', event.target.value,
              )}
            />
          </label>

          {initialError.title
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
            <select
              id="user"
              data-cy="userSelect"
              value={newTodo.userId}
              onChange={event => handleInputChange(
                'userId', +event.target.value,
              )}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {initialError.userId
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
