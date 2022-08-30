import './App.scss';
import React, { useState } from 'react';

import { TodoList } from './components/TodoList/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

let maxTodosId = [...todos].sort((a, b) => b.id - a.id)[0].id;

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isValidTitle, setValidTitle] = useState(true);
  const [isValidUser, setValidUser] = useState(true);

  const makeNewTodo = () => {
    maxTodosId += 1;

    const newTodo = {
      id: maxTodosId,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    todos.push(newTodo);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setValidTitle(true);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setValidUser(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setValidUser(false);
    }

    if (!title.trim()) {
      setValidTitle(false);
    }

    if (!userId || !title.trim()) {
      return;
    }

    makeNewTodo();

    setUserId(0);
    setTitle('');
    setValidTitle(true);
    setValidUser(true);
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
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeInput}
            />
          </label>

          {isValidTitle || <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              defaultValue={userId}
              value={userId}
              onChange={handleChangeSelect}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(({ name, id }) => (
                <option value={id} key={id}>{name}</option>
              ))}
            </select>
          </label>

          {isValidUser || <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
