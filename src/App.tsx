import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer || []);
  const users = usersFromServer || [];
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [errors, setErrors] = useState({ title: '', user: '' });

  const handleSubmit = e => {
    e.preventDefault();

    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (!selectedUserId) {
      newErrors.user = 'Please choose a user';
    }

    if (Object.keys(newErrors).length === 0) {
      const newTodo = {
        id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
        title: title.trim(),
        userId: selectedUserId,
        completed: false,
        user: users.find(user => user.id === Number(selectedUserId)),
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setSelectedUserId('');
      setErrors({ title: '', user: '' });
    } else {
      setErrors(newErrors);
    }
  };

  const handleTitleChange = e => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^a-zA-Z0-9\s\u0400-\u04FF]/g, '');

    setTitle(sanitizedValue);
    setErrors({ ...errors, title: sanitizedValue.trim() ? '' : errors.title });
  };

  const handleUserChange = e => {
    setSelectedUserId(e.target.value);
    setErrors({ ...errors, user: e.target.value ? '' : errors.user });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Todo Title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.user && <span className="error">{errors.user}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
