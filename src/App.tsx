import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todos } from './types/Todos';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

// eslint-disable-next-line @typescript-eslint/no-shadow
const getTodoId = (todos: Todos[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [visibleTodos, setVisibleTodos] = useState(todos);

  const addTodo = (newTodo: Todos) => {
    setVisibleTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleTitle = (value: string) => {
    setHasTitleError(false);
    setTitle(value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasUserIdError(!userId);
    setHasTitleError(!title);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todos = {
      id: getTodoId(visibleTodos),
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    addTodo(newTodo);
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
          <label className="title" htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => (handleTitle(event.target.value))}
          />

          {hasTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label className="user" htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={(event) => {
              setHasUserIdError(false);
              setUserId(Number(event.target.value));
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
