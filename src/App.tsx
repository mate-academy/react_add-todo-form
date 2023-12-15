import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import Todo from './types/Todo';
import User from './types/User';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

function getNewId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
})) as Todo[];

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setHasUserError(false);
  };

  const addTodo = (todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const reset = () => {
    setTitle('');
    setHasTitleError(false);
    setSelectedUser(0);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!selectedUser);

    if (!title || !selectedUser) {
      return;
    }

    addTodo({
      title,
      userId: selectedUser,
      completed: false,
      id: getNewId(todos),
      user: getUserById(selectedUser) as User,
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label">
            Title:

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Please enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {hasTitleError
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label">
            User:

            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {hasUserError
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
