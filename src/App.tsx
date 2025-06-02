import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { usersFromServer } from './api/users';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [errors, setErrors] = useState<{ title?: string; user?: string }>({});
  const [showErrors, setShowErrors] = useState(false);

  const handleAddTodo = () => {
    const trimmedTitle = title
      .replace(/[^a-zA-Zа-яА-ЯёЁґҐіІїЇєЄ0-9 ]/g, '')
      .trim(); // UA/EN + цифри + пробіли
    const user = usersFromServer.find(u => u.id === +selectedUserId);

    const newErrors: { title?: string; user?: string } = {};

    if (!trimmedTitle) {
      newErrors.title = 'Please enter a title';
    }

    if (!user) {
      newErrors.user = 'Please choose a user';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowErrors(true);

      return;
    }

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title: trimmedTitle,
      userId: user.id,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);

    // Reset
    setTitle('');
    setSelectedUserId('');
    setErrors({});
    setShowErrors(false);
  };

  const handleTitleChange = (value: string) => {
    const cleaned = value.replace(/[^a-zA-Zа-яА-ЯёЁґҐіІїЇєЄ0-9 ]/g, '');

    setTitle(cleaned);
    if (showErrors && errors.title) {
      setErrors(prev => ({ ...prev, title: undefined }));
    }
  };

  const handleUserChange = (value: string) => {
    setSelectedUserId(value);
    if (showErrors && errors.user) {
      setErrors(prev => ({ ...prev, user: undefined }));
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <div>
        <label htmlFor="titleInput">Title:</label>
        <input
          id="titleInput"
          data-cy="titleInput"
          type="text"
          value={title}
          placeholder="Enter task title"
          onChange={e => handleTitleChange(e.target.value)}
        />
        {showErrors && errors.title && (
          <div style={{ color: 'red' }}>{errors.title}</div>
        )}

        <label htmlFor="userSelect">User:</label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={selectedUserId}
          onChange={e => handleUserChange(e.target.value)}
        >
          <option value="">Choose a user</option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {showErrors && errors.user && (
          <div style={{ color: 'red' }}>{errors.user}</div>
        )}

        <button onClick={handleAddTodo}>Add</button>
      </div>

      <TodoList todos={todos} />
    </div>
  );
};
