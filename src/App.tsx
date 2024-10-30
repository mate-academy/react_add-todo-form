import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './types';
import React from 'react';

export const App = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(u => u.id === todo.userId) as User,
  }));

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [errors, setErrors] = useState({ title: '', user: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { title: '', user: '' };

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
      valid = false;
    }

    if (userId === '0') {
      newErrors.user = 'Please choose a user';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const user = usersFromServer.find(u => u.id === parseInt(userId));

      if (!user) {
        setErrors({ ...newErrors, user: 'User not found' });

        return;
      }

      const newTodo: Todo = {
        id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
        title: title.trim(),
        userId: parseInt(userId),
        completed: false,
        user: user,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId('0');
      setErrors({ title: '', user: '' });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');

    setTitle(value);
    if (value) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
    if (e.target.value !== '0') {
      setErrors(prev => ({ ...prev, user: '' }));
    }
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
            placeholder="Enter todo title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
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
