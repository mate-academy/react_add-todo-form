import React, { useState } from 'react';

import './App.scss';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/TodoWithUser';

const preparedTodos: TodoWithUser [] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => todo.userId === id) || null,
}));

export const App: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<TodoWithUser[]>(preparedTodos);
  const [isHideTitleError, setIsHiddenTitleError] = useState(false);
  const [isHideSelectError, setIsHiddenSelectError] = useState(false);

  const newTodoUser = usersFromServer.find(({ id }) => id === userId);

  const maxId = Math.max(...todos.map(todo => todo.id));
  const regex = /[^a-zA-Zа-яА-Я0-9\s]/g;

  const newTodo = {
    id: maxId + 1,
    title: todoTitle,
    userId,
    completed: false,
    user: newTodoUser || null,
  };

  const todoTitleInputHandler
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value.replace(regex, ''));
    setIsHiddenTitleError(false);
  };

  const userIdHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsHiddenSelectError(false);
  };

  const sabmitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle && userId) {
      setTodos((prevState => [...prevState, newTodo]));
      setTodoTitle('');
      setUserId(0);
    }

    if (!todoTitle) {
      setIsHiddenTitleError(true);
    }

    if (!userId) {
      setIsHiddenSelectError(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={sabmitFormHandler}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={todoTitleInputHandler}
          />

          {isHideTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            value={userId}
            data-cy="userSelect"
            onChange={userIdHandler}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {isHideSelectError && (
            <span className="error">
              Please choose a user
            </span>
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
