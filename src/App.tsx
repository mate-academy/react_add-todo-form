import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [newUser, setNewUser] = useState('');
  const [title, setTitle] = useState('');
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setNewUser(value);
    setUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!newUser) {
      setUserError(true);
    }

    if (newUser && title) {
      const newId = Math.max(...todos.map(item => item.id)) + 1;

      const newTodo = {
        id: newId,
        title: title.replace(/[^a-zA-Z0-9\s]/g, ''),
        completed: false,
        userId: Number(newUser),
        user: getUser(Number(newUser)),
      };

      todos.push(newTodo);

      setNewUser('');
      setTitle('');
      setUserError(false);
      setTitleError(false);
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
          <label>
            {'Title: '}
            <input
              value={title}
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={newUser}
              onChange={handleUserChange}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
