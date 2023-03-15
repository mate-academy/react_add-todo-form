import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function findUser(id: number) {
  return usersFromServer.find(user => user.id === id) || null;
}

const todoList: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: findUser(todo.userId),
  }
));

function getId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(todoList);
  const [title, setTitle] = useState('');
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setShowTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setShowUserError(false);
  };

  const clear = () => {
    setTitle('');
    setUserId(0);
    setShowTitleError(false);
    setShowUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId && title.trim()) {
      const newTodo = {
        id: getId(todos),
        title,
        completed: false,
        userId,
        user: findUser(userId),
      };

      setTodos(state => [...state, newTodo]);
      clear();
    }

    if (!userId) {
      setShowUserError(true);
    }

    if (!title.trim()) {
      setShowTitleError(true);
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
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          {showTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {showUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
