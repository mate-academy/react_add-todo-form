import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isFailedToSubmit, setIsFailedToSubmit] = useState(false);
  const [curTodos, setCurTodos] = useState(todos);

  const getNewTodoId = (allTodos: Todo[]) => {
    const todoWithLargestId = [...allTodos].sort(
      (todo1, todo2) => todo2.id - todo1.id,
    )[0];

    return todoWithLargestId.id + 1;
  };

  const setCorrectTitle = (target: HTMLInputElement) => {
    return /^[A-Za-zа-яА-Я0-9\s]*$/.test(target.value)
      ? setTitle(target.value)
      : '';
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId !== 0 && title !== '') {
      const newTodo = {
        id: getNewTodoId(curTodos),
        userId,
        title,
        completed: false,
        user: getUser(userId),
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
          {title === '' && isFailedToSubmit && (
            <span className="error">Please enter a title</span>
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
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {userId === 0 && isFailedToSubmit && (
            <span className="error">Please choose a user</span>
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
