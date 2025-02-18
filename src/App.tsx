import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './types';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const createNewTodo = (title: string, userId: number, todos: Todo[]): Todo => {
  const maxId = todos.reduce((max, todo) => (todo.id > max ? todo.id : max), 0);

  return {
    id: maxId + 1,
    title: title.trim(),
    completed: false,
    userId,
    user: getUserById(userId),
  };
};

const DEFAULT_USER_ID = 0;
const EMPTY_TITLE_ERROR = 'Please enter a title';
const EMPTY_USER_ERROR = 'Please choose a user';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(DEFAULT_USER_ID);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const resetAll = () => {
    setTitle('');
    setUserId(DEFAULT_USER_ID);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    if (title && userId) {
      const newTodo = createNewTodo(title, userId, todos);

      setTodos(prevTodos => [...prevTodos, newTodo]);
      resetAll();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="post-title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="post-title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">{EMPTY_TITLE_ERROR}</span>}
        </div>

        <div className="field">
          <label htmlFor="post-user">User: </label>
          <select
            data-cy="userSelect"
            id="post-user"
            value={userId}
            onChange={handleUserIdChange}
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

          {hasUserIdError && <span className="error">{EMPTY_USER_ERROR}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
