import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import { User } from './types/Types';
import { Todo } from './types/Types';
import todosFromServer from './api/todos';
import React, { useState } from 'react';

export const App = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(u => u.id === todo.userId) as User,
  }));

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [errors, setErrors] = useState({
    title: '',
    user: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = { title: '', user: '' };

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
      hasErrors = true;
    }

    if (userId === 0) {
      newErrors.user = 'Please choose a user';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title.trim(),
      userId,
      completed: false,
      user: usersFromServer.find(u => u.id === userId) as User,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
    setErrors({ title: '', user: '' });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    if (errors.user) {
      setErrors(prev => ({ ...prev, user: '' }));
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="users">User: </label>
          <select
            id="users"
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
