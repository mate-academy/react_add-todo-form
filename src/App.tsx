import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/user';
import { Todo } from './types/todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [selectedUserId, setSelecterUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [errorTitle, setErrorTitle] = useState(true);
  const [errorUser, setErrorUser] = useState(true);

  const handleUpdatingTodos = (event: React.MouseEvent) => {
    event.preventDefault();

    const newId = Math.max(...currentTodos.map(todo => todo.id)) + 1;
    const selectedUser = getUser(selectedUserId);

    if (selectedUser && title.trim()) {
      const newTodo: Todo = {
        id: newId,
        userId: selectedUser.id,
        title,
        completed: false,
        user: selectedUser,
      };

      setSelecterUserId(0);
      setTitle('');
      setCurrentTodos([...currentTodos, newTodo]);
    }

    if (!selectedUserId) {
      setErrorUser(false);
    }

    if (!title.trim().length) {
      setErrorTitle(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            name="title"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorTitle(true);
            }}
          />

          {!errorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={(event) => {
              setSelecterUserId(Number(event.target.value));
              setErrorUser(true);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!errorUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleUpdatingTodos}
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList
          todos={currentTodos}
        />
      </section>
    </div>
  );
};
