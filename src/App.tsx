import { useState, ChangeEvent, FormEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => {
      const user = usersFromServer.find(u => u.id === todo.userId);

      return {
        ...todo,
        user: user!,
      };
    });
  });
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState({ title: '', userId: '' });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanTitle = e.target.value.replace(/[^\wа-яА-ЯёЁіІїЇєЄ\s]/gi, '');

    setTitle(cleanTitle);

    if (errors.title) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);

    if (errors.userId) {
      setErrors(prev => ({ ...prev, userId: '' }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      title: title.trim() ? '' : 'Please enter a title',
      userId: userId ? '' : 'Please choose a user',
    };

    if (newErrors.title || newErrors.userId) {
      setErrors(newErrors);

      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const user = usersFromServer.find(u => u.id === +userId);

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId: +userId,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="">Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
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
