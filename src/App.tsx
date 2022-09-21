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

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isvalidTitle, setValidTitle] = useState(true);
  const [isvalidUser, setValidUser] = useState(true);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setValidTitle(true);
    setTitle(value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setValidUser(true);
    setUserId(+value);
  };

  const newUserId = [...todos].sort((a, b) => b.id - a.id)[0].id;

  const makeNewUser = () => {
    const newUser = {
      id: newUserId + 1,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    todos.push(newUser);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidTitle(false);

    if (!userId) {
      setValidUser(false);
    }

    if (!title) {
      setValidTitle(false);
    }

    if (!userId || !title) {
      return;
    }

    makeNewUser();

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
          <label htmlFor="title">Enter a title</label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
            id="title"
          />
          {(!isvalidTitle && !title)
             && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">Choose a user</label>
          <select
            data-cy="userSelect"
            defaultValue={userId}
            value={userId}
            onChange={handleSelect}
            id="user"
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>
          {!isvalidUser && <span className="error">Please choose a user</span>}
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
