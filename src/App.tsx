import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const users = usersFromServer;

  const initialTodos = todosFromServer.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));

  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (userId === 0) {
      setUserIdError(true);
    } else {
      setUserIdError(false);
    }

    if (title && userId !== 0) {
      const maxId = Math.max(...todos.map(todo => todo.id));

      const newTodo: Todo = {
        id: maxId + 1,
        title,
        completed: false,
        userId,
        user: users.find(user => user.id === userId) || null,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setUserIdError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
