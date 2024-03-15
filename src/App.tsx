import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [error, setError] = useState({
    title: false,
    userId: false,
  });

  const [todos, setTodos] = useState(initialTodos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-z A-Z а-я A-Z I і \d]/g, ''));
    setError(prev => ({
      ...prev,
      title: false,
    }));
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setError(prev => ({
      ...prev,
      userId: false,
    }));
  };

  const getMaxId = () => {
    return Math.max(...todos.map(({ id }) => id)) + 1;
  };

  const onAdd = (todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setError(prev => ({
        ...prev,
        title: true,
      }));
    }

    if (!userId) {
      setError(prev => ({
        ...prev,
        userId: true,
      }));
    }

    if (!title || !userId) {
      return;
    }

    onAdd({
      title,
      userId,
      id: getMaxId(),
      completed: false,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {error.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          Users:
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
          {error.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
