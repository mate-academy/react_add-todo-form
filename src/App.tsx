import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { TodoWithUser } from './types/TodoWithUser';
import { TodoList } from './components/TodoList';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function findTodoId(todos: TodoWithUser[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

const todos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [availableTodos, setAvailableTodos] = useState(todos);

  const resetState = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitle = (value: string) => {
    setErrorTitle(false);
    setTitle(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimedTitle = title.trim();

    setErrorUser(!userId);
    setErrorTitle(!trimedTitle);

    if (!trimedTitle || !userId) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: findTodoId(availableTodos),
      title,
      completed: false,
      userId,
      user: findUserById(userId),
    };

    setAvailableTodos(currentTodos => [...currentTodos, newTodo]);

    resetState();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={event => (
                handleTitle(event.target.value)
              )}
            />
          </label>
          {
            errorTitle && (
              <span className="error">Please enter a title</span>
            )
          }
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              id="userSelect"
              value={userId}
              onChange={(event) => {
                setErrorUser(false);
                setUserId(+event.target.value);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {errorUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={availableTodos} />
    </div>
  );
};
