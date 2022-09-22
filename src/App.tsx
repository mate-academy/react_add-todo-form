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
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setIsValidTitle(false);
    setTitle(value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setIsValidUser(false);
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

    if (!userId) {
      setIsValidUser(true);
    }

    if (!title.trim()) {
      setIsValidTitle(true);
    }

    if (!userId || !title.trim()) {
      return;
    }

    makeNewUser();

    setUserId(0);
    setTitle('');
    setIsValidTitle(false);
    setIsValidUser(false);
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
          {(isValidTitle)
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
          {isValidUser && <span className="error">Please choose a user</span>}
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
