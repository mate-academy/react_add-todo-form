import React, { useState } from 'react';
import { Todo } from './types';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import todosData from './api/todos';
import usersData from './api/users';

export const App: React.FC = () => {
  const users = usersData;

  const initialTodos: Todo[] = todosData.map(todo => {
    const user = users.find(user => user.id === todo.userId);
    return {
      ...todo,
      user: user || { id: 0, name: 'Unknown', email: '' },
    };
  });
  

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [error, setError] = useState<{ title: string; user: string }>({ title: '', user: '' });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    setError({ title: '', user: '' });

    const newErrors = { title: '', user: '' };

    if (!title) {
      newErrors.title = 'Please enter a title';
    }

    if (userId === 0) {
      newErrors.user = 'Please choose a user';
    }

    if (newErrors.title || newErrors.user) {
      setError(newErrors);
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title,
      userId,
      completed: false,
      user: users.find(user => user.id === userId) || { id: 0, name: 'Unknown', email: '' }, // додати користувача
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error.title) {
      setError(prev => ({ ...prev, title: '' }));
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    if (error.user) {
      setError(prev => ({ ...prev, user: '' }));
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {error.title && <span className="error">{error.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {error.user && <span className="error">{error.user}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
