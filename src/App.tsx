import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';

function findUser(id: number): User | null {
  return usersFromServer.find(user => user.id === id) || null;
}

const todoList: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: findUser(todo.id),
  }
));

function generateNextId(todos: Todo[]): number {
  const idArray = todos.map(todo => todo.id).sort((a, b) => b - a);

  return idArray[0] + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(todoList);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const clear = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
    setUserError(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      setUserError(true);
    }

    if (!title) {
      setTitleError(true);
    }

    if (title && userId) {
      const newTodo = {
        id: generateNextId(todos),
        title,
        completed: false,
        userId,
        user: findUser(userId),
      };

      setTodos(state => [...state, newTodo]);

      clear();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>

          {userError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
