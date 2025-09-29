import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(u => u.id === todo.userId)!,
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState<{ title?: string; userId?: string }>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: { title?: string; userId?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (!userId) {
      newErrors.userId = 'Please choose a user';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    const newId = todos.length
      ? Math.max(...todos.map(todo => todo.id)) + 1
      : 1;
    const user = usersFromServer.find(u => u.id === +userId)!;

    const newTodo = {
      id: newId,
      title,
      completed: false,
      userId: +userId,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
    setErrors({});
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄ0-9 ]/g, ''));
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: undefined }));
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    if (errors.userId) {
      setErrors(prev => ({ ...prev, userId: undefined }));
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
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
