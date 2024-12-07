import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { Todo } from './types/Todo';

function findUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

const todos = todosFromServer.map(todo => {
  const user = findUserById(todo.userId);

  return { ...todo, user };
});

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [updatedTodos, setUpdatedTodos] = useState<Todo[]>(todos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectedUserError, setHasSelectedUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setHasSelectedUserError(false);
  };

  const getNextTodoId = (): number => {
    return Math.max(...updatedTodos.map(todo => todo.id)) + 1;
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!selectedUser) {
      setHasSelectedUserError(true);

      return;
    }

    if (!title) {
      setHasTitleError(true);

      return;
    }

    const newTodo: Todo = {
      id: getNextTodoId(),
      title,
      completed: false,
      userId: selectedUser,
      user: findUserById(selectedUser),
    };

    setUpdatedTodos(prevTodos => [...prevTodos, newTodo]);
    setSelectedUser(0);
    setTitle('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">
            {'Title: '}
            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              id="todo-title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserChange}
              id="user-select"
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {hasSelectedUserError && (
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
