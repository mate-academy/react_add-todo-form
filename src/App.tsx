import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [todos, setTodos] = useState(initialTodos);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSetUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(Number(event.target.value));
  };

  const clearForm = () => {
    setTitle('');
    setUser(0);
    setIsFormSubmitted(false);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user && title) {
      const newTodo: Todo = {
        userId: Number(user),
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        user: getUserById(Number(user)),
      };

      setTodos([...todos, newTodo]);
      clearForm();
    } else {
      setIsFormSubmitted(true);
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
          {isFormSubmitted
          && !title
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={handleSetUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(userFromServer => {
              const { id, name } = userFromServer;

              return (
                <option key={id} value={id}>{name}</option>
              );
            })}
          </select>

          {isFormSubmitted
          && !user
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
