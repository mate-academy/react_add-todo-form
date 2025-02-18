import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [errors, setErrors] = useState<{ title: string; userId: string }>({
    title: '',
    userId: '',
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄ0-9\s]/g, ''));
    if (errors.title) {
      setErrors(prevErrors => ({ ...prevErrors, title: '' }));
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    if (errors.userId) {
      setErrors(prevErrors => ({ ...prevErrors, userId: '' }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: { title: string; userId: string } = {
      title: title ? '' : 'Please enter a title',
      userId: userId !== '0' ? '' : 'Please choose a user',
    };

    if (newErrors.title.trim() || newErrors.userId) {
      setErrors(newErrors);

      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: title,
      userId: parseInt(userId),
      user: usersFromServer.find(user => user.id === parseInt(userId)),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter todo title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            data-cy="userSelect"
            id="user"
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

          {errors.userId && <span className="error">{errors.userId}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
