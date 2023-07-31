import './App.scss';
import { useState } from 'react';
import { findUserById } from './services/user';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { generateTodoId } from './services/todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const preparedTodos: Todo[] = todosFromServer.map((todo) => {
    const user = findUserById(todo.userId, usersFromServer);

    return {
      ...todo,
      user,
    };
  });

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [todos, setTodos] = useState(preparedTodos);

  const reset = () => {
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    const id = generateTodoId(todos);
    const user = findUserById(userId, usersFromServer);
    const newTodo: Todo = {
      id,
      title,
      userId,
      user,
      completed: false,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);
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
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setUserIdError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {userIdError && (
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
