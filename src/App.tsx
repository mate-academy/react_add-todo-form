import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isFailedToSubmit, setIsFailedToSubmit] = useState(false);
  const [curTodos, setCurTodos] = useState(todos);
  const hasNoTitle = title.trim() === '' && isFailedToSubmit;

  const getNewTodoId = (allTodos: Todo[]) => {
    const largestId = allTodos.reduce(
      (prevTodoId, todo) => Math.max(prevTodoId, todo.id), 0,
    );

    return largestId + 1;
  };

  const setCorrectTitle = (target: HTMLInputElement) => {
    return /^[A-Za-zа-яА-Я0-9\s]*$/.test(target.value)
      ? setTitle(target.value)
      : '';
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId !== 0 && title.trim() !== '') {
      const newTodo = {
        id: getNewTodoId(curTodos),
        userId,
        title,
        completed: false,
        user: getUserById(userId),
      };

      setCurTodos(current => ([
        ...current,
        newTodo,
      ]));

      setUserId(0);
      setTitle('');
      setIsFailedToSubmit(false);
    } else {
      setIsFailedToSubmit(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => setCorrectTitle(event.target)}
          />
          {hasNoTitle && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            name="userId"
            value={userId}
            onChange={(event) => setUserId(+event.target.value)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!userId && isFailedToSubmit && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={curTodos} />
    </div>
  );
};
