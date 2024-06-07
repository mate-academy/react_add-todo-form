import React, { useState } from 'react';
import './App.scss';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getTodosFromServer(): Todo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState(getTodosFromServer());
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function getNewTodoId(): number {
    return (
      1 +
      todos.reduce((maxId, todo) => {
        const { id } = todo;

        return id > maxId ? id : maxId;
      }, 0)
    );
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value);
    setTitleError(false);
  }

  function handleUserIdChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.currentTarget.value);
    setUserError(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let errorOccured = false;

    if (title === '') {
      setTitleError(true);
      errorOccured = true;
    }

    if (userId === 0) {
      setUserError(true);
      errorOccured = true;
    }

    if (errorOccured) {
      return;
    }

    const todo: Todo = {
      id: getNewTodoId(),
      userId,
      title,
      completed: false,
      user: getUser(userId),
    };

    setTodos([...todos, todo]);
    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter TODO title"
            onChange={handleTitleChange}
          />

          {titleError && <span className="error"> Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
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

          {userError && <span className="error"> Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
