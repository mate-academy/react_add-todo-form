/* eslint-disable no-console */
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

function getUserById(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(true);
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(true);

  const getNextId = () => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validTitle = event.target.value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '');

    setTitle(validTitle);
    if (validTitle.trim()) {
      setHasTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    if (+event.target.value !== 0) {
      setHasUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setHasTitleError(true);
      hasError = true;
    }

    if (userId === 0) {
      setHasUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const existingTodo = todosFromServer.find(todo => todo.userId === userId);

    const newTodo: Todo = {
      id: getNextId(),
      title,
      completed: existingTodo ? existingTodo.completed : false,
      userId,
      user: getUserById(userId),
    };

    console.log('User info', newTodo);

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            required
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
            required
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
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
