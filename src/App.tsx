import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer || []);
  const [users] = useState(usersFromServer || []);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ title?: string; user?: string }>({});

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors(prevErrors => ({ ...prevErrors, title: undefined }));
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(e.target.value));
    if (errors.user) {
      setErrors(prevErrors => ({ ...prevErrors, user: undefined }));
    }
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; user?: string } = {};

    if (!title) {
      newErrors.title = 'Please enter a title';
    }

    if (selectedUser === null) {
      newErrors.user = 'Please choose a user';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUser(null);
    setErrors({});
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser || ''}
            onChange={handleUserChange}
            required
          >
            <option value="" disabled>
              Choose a user
            </option>
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

      <section className="TodoList">
        <TodoList todos={todos} users={users} />
      </section>
    </div>
  );
};
