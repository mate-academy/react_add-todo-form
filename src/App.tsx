import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';
import todosFromServer from './api/todos';

const getUser = (userId: number) => (
  usersFromServer.find(user => user.id === userId) || null);

const defaultTodos: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUser(todo.userId),

  }
));

export const App: React.FC = () => {
  const [isErrorUser, setIsErrorUser] = useState(false);
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(defaultTodos);
  const [completed] = useState(false);

  const createTodo = () => (
    {
      id: Math.max(0, ...todos.map(({ id }) => id + 1)),
      title,
      completed,
      userId,
      user: getUser(userId) || null,
    }
  );

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (title.length === 0) {
      setIsErrorTitle(true);
    }

    if (userId === 0) {
      setIsErrorUser(true);
    }

    if (isErrorTitle || isErrorUser) {
      return;
    }

    if (title && userId) {
      setTitle('');
      setUserId(0);
      setTodos([...todos, createTodo()]);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <div className="field">
          <label htmlFor="">
            Title:
            <input
              placeholder='Enter a title'
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={(event) => {
                setTitle(event.currentTarget.value);
                setIsErrorTitle(false);
              }}
            />
          </label>
          {isErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="">
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(Number(event.currentTarget.value));
                setIsErrorUser(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {isErrorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
