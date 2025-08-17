import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/types';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(u => u.id === todo.userId)!,
    })),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [errors, setErrors] = useState({ title: '', user: '' });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { title: '', user: '' };

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
      hasError = true;
    }

    if (!userId) {
      newErrors.user = 'Please choose a user';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);

      return;
    }

    const user = usersFromServer.find(u => u.id === userId)!;
    const newTodo: Todo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title,
      completed: false,
      userId: user.id,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(null);
    setErrors({ title: '', user: '' });
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
            onChange={e => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors(prev => ({ ...prev, title: '' }));
              }
            }}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId ?? ''}
            onChange={e => {
              setUserId(Number(e.target.value));
              if (errors.user) {
                setErrors(prev => ({ ...prev, user: '' }));
              }
            }}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
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
