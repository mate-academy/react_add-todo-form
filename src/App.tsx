import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import React, { useState } from 'react';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const App = () => {
  const todos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const [userId, setUserId] = useState(+'');
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [newTodos, setNewTodos] = useState<Todo[]>(todos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: title,
      userId: +userId,
      completed: false,
      user: getUser(userId),
    };

    setNewTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(+'');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {hasTitleError && (
            <span className="error">Please enter a tittle</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            data-cy="userSelect"
            id="userSelect"
            name="userId"
            value={userId}
            onChange={handleUserChange}
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
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={newTodos} />
    </div>
  );
};
