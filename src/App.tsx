import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { User } from './types/user';

function getUser(userId: number): User | null {
  const finalUser = usersFromServer.find(user => user.id === userId);

  return finalUser || null;
}

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(preparedTodos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const addTodo = (id: number) => {
    const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

    if (getUser(id) && title.trim()) {
      const newTodo = {
        id: maxId,
        userId,
        title,
        completed: false,
        user: getUser(userId),
      };

      setTodos(currentTodos => ([
        ...currentTodos,
        newTodo,
      ]));

      setUserId(0);
      setTitle('');
    }

    if (!userId) {
      setUserId(0);
      setHasUserError(false);
    }

    if (!title.trim()) {
      setHasTitleError(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(userId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">
            Title:
          </label>

          <input
            type="text"
            data-cy="titleInput"
            id="titileInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setHasTitleError(true);
            }}
          />

          {!hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setHasUserError(true);
            }}
          >
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
