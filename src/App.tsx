import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const initialTodos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | string>('');
  const [errors, setErrors] = useState<{ title?: string; user?: string }>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: { title?: string; user?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (!selectedUserId) {
      newErrors.user = 'Please choose a user';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newTodo = {
        id: Math.max(...todos.map(t => t.id)) + 1,
        title: title.trim(),
        userId: Number(selectedUserId),
        completed: false,
        user: getUserById(Number(selectedUserId)),
      };

      setTitle('');
      setSelectedUserId('');
      setTodos([...todos, newTodo]);
      setErrors({});
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Static list of todos</h1>
      <TodoList todos={todos} />

      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title:</label>
        <input
          data-cy="titleInput"
          name="title"
          value={title}
          placeholder="Enter a title"
          onChange={e => {
            setTitle(e.target.value);
            if (errors.title) {
              const newErrors = { ...errors };

              delete newErrors.title;
              setErrors(newErrors);
            }
          }}
        />
        {errors.title && (
          <p className="error" style={{ color: 'red' }}>
            {errors.title}
          </p>
        )}
        <select
          data-cy="userSelect"
          value={selectedUserId}
          onChange={e => {
            setSelectedUserId(e.target.value);
            if (errors.user) {
              const newErrors = { ...errors };

              delete newErrors.user;
              setErrors(newErrors);
            }
          }}
        >
          <option value="">Choose a user</option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.user && (
          <p className="error" style={{ color: 'red' }}>
            {errors.user}
          </p>
        )}
        <button type="submit" data-cy="submitButton" className="button is-link">
          Add
        </button>
      </form>
    </div>
  );
};
