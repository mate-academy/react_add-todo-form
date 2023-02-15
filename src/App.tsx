import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const visibleTodos: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }
));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUser] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [todos, setTodos] = useState(visibleTodos);

  const resetFields = () => {
    setTitle('');
    setUser(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.length) {
      setErrorTitle(true);
    }

    if (!userId) {
      setErrorUser(true);
    }

    if (userId && title.length) {
      const todoId = Math.max(...todos.map(todo => todo.id)) + 1;
      const currentUser = usersFromServer.find(
        user => user.id === userId,
      ) || null;
      const newTodo = {
        id: todoId,
        title,
        completed: false,
        userId,
        user: currentUser,
      };

      setTodos((currentTodos) => [...currentTodos, newTodo]);
      resetFields();
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setErrorUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          <label htmlFor="title">Title:</label>

          <input
            type="text"
            value={title}
            onChange={handleChangeTitle}
            placeholder="Enter a title"
            data-cy="titleInput"
            pattern="^[а-яА-Яa-zA-Z\s\d]+$"
          />

          {errorTitle
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>

          <select
            placeholder="Choose a user"
            data-cy="userSelect"
            value={userId}
            onChange={handleChangeUser}
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

          {errorUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
