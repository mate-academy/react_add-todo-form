import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const initialTodos = todosFromServer.map(soloTodo => ({
    ...soloTodo,
    user: usersFromServer.find(soloUser => soloUser.id === soloTodo.userId)!,
  }));
  const [todos, setTodos] = useState(initialTodos);
  const [users] = useState(usersFromServer);

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [errors, setErrors] = useState({
    title: false,
    user: false,
    tried: false,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    function reset() {
      setTitle('');
      setSelectedUserId('');
      setErrors({ title: false, user: false, tried: false });
    }

    setErrors(prev => ({ ...prev, tried: true }));
    const titleValid = title.trim() !== '';
    const userValid = selectedUserId !== '';

    if (!titleValid || !userValid) {
      setErrors(prev => ({ ...prev, title: !titleValid, user: !userValid }));

      return;
    }

    const nextId = todos.length
      ? Math.max(...todos.map(soloTodo => soloTodo.id)) + 1
      : 1;

    const user = users.find(soloUser => soloUser.id === selectedUserId);

    if (!user) {
      return;
    }

    const newTodo = {
      id: nextId,
      title: title.trim(),
      completed: false,
      userId: user.id,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    };

    setTodos(prev => [...prev, newTodo]);

    reset();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (errors.title) {
      setErrors(prev => ({ ...prev, title: false }));
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const raw = event.target.value;
    const value = raw === '' ? '' : Number(raw);

    setSelectedUserId(value);
    if (errors.user) {
      setErrors(prev => ({ ...prev, user: false }));
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            value={title}
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {errors.tried && errors.title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <label htmlFor="user">User: </label>

        <select
          data-cy="userSelect"
          name="user"
          value={selectedUserId}
          onChange={handleSelectChange}
        >
          <option value="">Choose a user</option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {errors.tried && errors.user && (
          <span className="error">Please choose a user</span>
        )}

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
