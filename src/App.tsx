import './App.scss';

import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getUserByName(userName: string): User | null {
  return usersFromServer.find(user => user.name === userName) || null;
}

export const App = () => {
  const appropriateTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [title, setInputTitle] = useState('');
  const [name, setName] = useState('0');
  const [todos, setTodos] = useState(appropriateTodos);
  const [isTitleChanged, setIsTitleChanged] = useState(true);
  const [isUserPicked, setIsUserPicked] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title !== '' && name !== '0') {
      const newTodo: Todo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: getUserByName(name)?.id || -1,
        user: getUserByName(name),
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputTitle('');
      setName('0');
    }

    if (name === '0') {
      setIsUserPicked(false);
    }

    if (title === '') {
      setIsTitleChanged(false);
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
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            placeholder="Enter a title"
            onChange={(event) => {
              setInputTitle(event.target.value);
              setIsTitleChanged(true);
            }}
          />
          {!isTitleChanged
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setIsUserPicked(true);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!isUserPicked
            && <span className="error">Please choose a user</span>}
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
