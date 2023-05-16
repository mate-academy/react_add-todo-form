import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('0');
  const [todos, setTodos] = useState(initialTodos);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSetUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
  };

  const clearForm = () => {
    setTitle('');
    setUser('0');
    setFormSubmitted(false);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user !== '0' && title !== '') {
      const newTodo: Todo = {
        userId: Number(user),
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        user: getUser(Number(user)),
      };

      setTodos([...todos, newTodo]);
      clearForm();
    } else {
      setFormSubmitted(true);
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleSetTitle}
          />
          {formSubmitted
          && title === ''
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={handleSetUser}
          >
            <option value="0" selected disabled>Choose a user</option>
            {usersFromServer.map(userFromServer => {
              return (
                <option value={userFromServer.id}>{userFromServer.name}</option>
              );
            })}
          </select>

          {formSubmitted
          && user === '0'
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
