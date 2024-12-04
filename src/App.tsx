import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';
import React, { ChangeEvent, useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const getPreparedTodos = () => {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId) || null,
  }));
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(getPreparedTodos());
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleInputError, setTitleInputError] = useState(false);
  const [userSelectError, setUserSelectError] = useState(false);

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
    setTitleInputError(false);
    setUserSelectError(false);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTitleInputError(!title);
    setUserSelectError(!selectedUserId);

    if (!title && !selectedUserId) {
      return;
    }

    setTodos(currentTodos => {
      const newId = Math.max(0, ...currentTodos.map(todo => todo.id)) + 1;
      const user = getUserById(selectedUserId);

      const newTodo: Todo = {
        id: newId,
        title: title,
        userId: selectedUserId,
        completed: false,
        user: user || null,
      };

      return [...currentTodos, newTodo];
    });

    reset();
  }

  function handleTitleInput(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value.trimStart());
    setTitleInputError(false);
  }

  function handleUserSelect(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUserId(Number(event.target.value));
    setUserSelectError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleInput}
            placeholder="title"
          />
          {titleInputError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserSelect}
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

          {userSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
